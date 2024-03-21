import { Request, Response } from 'express'// ສ້າງ API 
import Musuem from '@/models/Musuem'
import Gallery from '@/models/Gallery'

const musuemController = {
    //ສ້າງ function ບັນທຶກຂໍ້ມູນ
    add_mesuem: async (req: Request, res: Response) => {
        const { contact, address, gallery } = req.body
        try {
            const auth = req.user
            const galleryId = []
            for (let i = 0; i < gallery.length; i++) {
                const obj = (gallery[i])
                const addGallery = new Gallery({
                    title: obj.title,
                    detail: obj.detail,
                    img: obj.img
                })
                await addGallery.save()
                galleryId.push(addGallery)
            }
            const addMuseum = new Musuem({
                contact, address, galleryId, userId: auth
            })
            await addMuseum.save()
            res.status(201).json({ addMuseum })
        } catch (e) {
            console.error(e)
            res.status(501).json(e) // return error to client web browser
        }
    },
    show_mesuem: async (req: Request, res: Response) => {
        try {
            const getMuseum: any = await Musuem.findOne().populate('galleryId')
            res.status(200).json({ show: getMuseum })
        } catch (e) {
            res.send(e)
        }
    },
    deleteMusuem: async (req: Request, res: Response) => {
        try {
            const { _id } = req.params
            const isCheck = await Gallery.findOne({_id})
            if(!isCheck)return res.status(409).json({message:"ບໍ່ມີຂໍ້ມູນ"})
            await Gallery.findByIdAndDelete(isCheck)
        res.status(201).json({message:"ລົບຂໍ້ມູນສຳເລັດ"})
        } catch (e) {
            console.error(e)
            res.status(501).json(e)
        }
    },
    updateMusuem: async (req: Request, res: Response) => {
        try {
            const { _id, contact, address, gallery } = req.body
            const galleryId = []
            for (let i = 0; i < gallery.length; i++) {
                const obj = (gallery[i])
                if (obj && obj._id) {
                    await Gallery.findByIdAndUpdate(obj._id, {
                        $set: {
                            title: obj.title, detail: obj.detail, img: obj.img
                        }
                    }, { new: true })
                    galleryId.push(obj._id)
                }
                else {
                    const addGallery = new Gallery({
                        title: obj.title, detail: obj.detail, img: obj.img
                    })
                    await addGallery.save()
                    galleryId.push(addGallery)
                }
            }
            await Musuem.findByIdAndUpdate(_id, {
                $set: {
                    contact, address, galleryId
                }
            }, { new: true })
            res.status(201).json({ message: "ແກ້ໄຂສຳເລັດແລ້ວ" })
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }
}
export default musuemController