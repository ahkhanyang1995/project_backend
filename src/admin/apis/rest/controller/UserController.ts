import { Request, Response } from 'express'// ສ້າງ API 
import Users from '@/models/Users'
import { genHash } from '@/utils/bcrypt'
import { isUndefined } from 'lodash'
import District from '@/models/District'
import { mappers } from '@/service/mapper'
import { signToken } from '@/utils/jwt'
import { isAdmin } from '@/plugins/passport' // ດຶງ token  session
const userController = {
  //ສ້າງ function ບັນທຶກຂໍ້ມູນ
  add_User: async (req: Request, res: Response) => {
    const { name, districtId, village, mobile, email, password, status } = req.body
    try {
      // coding here
      
      const isEmail = await Users.findOne({ email })// ສ້າງຕົວປ່ຽນຄົນຫາ email
      if (isEmail) return res.status(409).json({ message: "ອິແມວນີ້ມີໃນລະບົບແລ້ວ" }) // ຖ້າມີອິແມວແລ້ວໃຫ້ຟ້ອງ 
      const addUser = new Users({
        name, districtId, village, mobile, email, password: genHash(password), status
        //password: genHash(password) ວິທີສ້າງ md5 
      })
      await addUser.save() // save data to database 
      res.status(201).json(addUser) // reture response to client 
    } catch (e) {
      console.error(e)
      res.status(501).json(e) // return error to client web browser
    }
  },
  //ສ້າງ Function ສະແດງຂໍ້ມູນ
  show_user: async (req: Request, res: Response) => {
    const { page, perPage, search }: any = req.query
    try {
      const isPage = parseInt(page)
      const isPerPage = parseInt(perPage)
      const isUserslist = await Users.find({
        $and: [
          search ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } }
            ]
          } : {}
        ]
      })
        .skip((isPage * isPerPage) - isPerPage)
        .limit(isPerPage)
        //join ຫຼາຍຕາຕະລາງ 
        .populate({ path: 'districtId', populate: 'provinceId' })
      // ສະແດງຂໍ້ມູນທີຕ້ອງການອອກມາ
      // ແບບ ບໍ່ຂຽນ function
      const mapper = await Promise.all(
        isUserslist.map((i: any) => {
          let address = ""
          if (i.districtId) address = i.village + "," + i.districtId.name + ', ' + i.districtId.provinceId.name
          return {
            _id: i._id,
            name: i.name,
            email: i.email,
            mobile: i.mobile,
            status: i.status,
            village: i.village,
            districtId: i.districtId,
            address,
            createAt: i.createdAt
          }
        })
      )

      //ແບບ funtion 
      const test = await mappers(isUserslist)
      // end 
      res.status(200).json({ info: mapper })

    } catch (e) {

      res.status(501).json(e)
    }
    // ຈົບການສະແດງຂໍ້ມູນ
  },
  // function ດຶງ ກ່ອນຂໍ້ມູນໄປ ອັບເດດ
  edit_user: async (req: Request, res: Response) => {
    const { _id } = req.params
    try {
      // ດຶງຂໍ້ມູນໄດ້ສະເພາະຜ່ານລະຫັດເທົ່ານັ້ນ
      const info = await Users.findById(_id).populate({ path: 'districtId', populate: 'provinceId' })
      res.status(200).json({ info })
      //const info2 = await Users.findOne({ _id }) //ດືງຂໍ້ມູນໄດ້ຕາມໃຈ
    } catch (e) {
      res.status(501).send(e)
    }
  },
  // function updata
  update_user: async (req: Request, res: Response) => {
    const { _id, name, districtId, village, mobile, email, password, status } = req.body

    try {
      const isCheck: any = await Users.findOne({ _id})
      if (!isCheck) return res.status(409).json({ message: "ບໍ່ມີລາຍງານນີ້" })
      let ispassword
      if (password) ispassword = genHash(password)
      await Users.findByIdAndUpdate(isCheck, {
        $set: {
          name, districtId, village, mobile, email, password: ispassword, status
        }
      }, { new: true, timestramp: false }) // timestramp:false = ບໍ່ໃຫ້ອັບເດດວັນທີເດືອນປີ 
      res.status(201).json({ message: "ແກ້ໄຂສຳເລັດແລ້ວ" })

    } catch (e) {
      res.status(501).send(e)
    }
  },
  // file login 
  adminLogin: async (req: Request, res: Response) => {
    try {
      const user = req.user
      const token=signToken(user)
      res.status(200).json({token})

    } catch (error) {
      res.status(501).json(error)
    }

  }
}
export default userController