import { Request, Response } from "express";
import Customer from "@/models/Customer";
import Users from "@/models/Users";
import { genHash } from "@/utils/bcrypt";
import Province from "@/models/Province";
import District from "@/models/District";
import { mappers } from "@/service/mapper";
import { isDate } from "lodash";
import { signToken } from "@/utils/jwt";
import { customerlogin } from "../Validations/UserValidation"
const url = process.env.URL || 'http://localhost:3000/'
const customerController = {
    registerCustomer: async (req: Request, res: Response) => {
        const { profile, name, phone, districtId, villag, email, password } = req.body
        try {
            const isEmail = await Users.findOne({ email })
            if (isEmail) return res.status(409).json({ message: "ອີແມວນີ້ມີໃນລະບົບແລ້ວ,ກາລຸນາປ້ອນອີແມວໃໝ່" })
            //add users
            const addUser = new Users({
                email, password: genHash(password), status: "Customer"
            })
            await addUser.save()
            // end created users
            //add customer
            const addCustomer = new Customer({
                profile, name, phone, districtId, villag, userId: addUser
            })
            await addCustomer.save()
            res.status(201).json({ addCustomer })
        } catch (e) {
            res.status(501).send(e)
        }
    },
    //ສ້າງ api ດຶງເມືອງ
    getProvince: async (req: Request, res: Response) => {
        try {
            const getProvince = await Province.find().sort('-sortOrder')
            const mapper = await Promise.all(
                getProvince.map(async (i: any) => {
                    const districtList = await District.find({ "provinceId": i._id })
                    return {
                        _id: i._id,
                        name: i.name,
                        districtList: districtList.map((d: any) => {
                            //ເລືອກເມືອງຂໍ້ມູນບ້ານ
                            //    const villageList=await village.find({"districtId":d._id})
                            return {
                                _id: d._id,
                                name: d.name
                                // ,villageList
                            }
                        })
                    }
                })
            )
            res.status(201).json({ info: mapper })
        } catch (e) {
            res.send(e)
        }
    },
    show_customer: async (req: Request, res: Response) => {
        const { page, perPage, search }: any = req.query
        try {
            const isPage = parseInt(page)
            const isPerPage = parseInt(perPage)
            const getCustomer = await Customer.find({
                $and: [
                    search ? { name: { $regex: search, $options: 'i' } } : {}
                ]
            }).skip((isPage * isPerPage) - isPerPage)
                .limit(isPerPage)
                .populate(['userId', { path: 'districtId', populate: 'provinceId' }])

            const countTotal = await Customer.find({
                $and: [
                    search ? {
                        $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { phone: { $regex: search, $options: 'i' } }
                        ]
                    } : {}
                ]
            }).countDocuments()
            const mappers = await Promise.all(
                getCustomer.map((i: any) => {
                    let address
                    if (i.districtId) {
                        address = i.village + ", " + i.districtId.name + ", " + i.districtId.provinceId.name
                    }
                    return {
                        _id: i._id,
                        profile: url + i.profile,
                        name: i.name,
                        phone: i.phone,
                        address,
                    }
                })
            )
            res.status(200).json({ info: mappers, countTotal })
        } catch (e) {
            console.error(e)
            res.status(501).json(e)
        }
    },
    customer_login: async (req: Request, res: Response) => {
        try {
            const auth = req.user
            console.log(auth)
            const accessToken = signToken(auth)
            res.status(200).json({ accessToken })

        } catch (e) {

            res.status(200).send(e)
        }
    },
    customer_profile: async (req: Request, res: Response) => {
        try {
            const auth = req.user
            const info = await Customer.findOne({ userId: auth })
                .populate(['userId', { path: 'districtId', populate: 'provinceId' }])

            res.status(200).json({ info })
        } catch (e) {
            res.status(501).send(e)
        }
    },
    update_customerProfile: async (req: Request, res: Response) => {
        const { profile, name, phone, districtId, village, email, password } = req.body
        try {
            const auth = req.user
            const isCheck_Profile: any = await Customer.findOne({ userId: auth })
            if (!isCheck_Profile) return res.status(409).json({ message: "ບໍ່ມີລາຍການນີ້" })
            if (email || password) {
                const userForm: any = {}
                if (password) userForm.password = genHash(password)
                const isCheck = await Users.findOne({ email, _id: auth })
                if (!isCheck) {
                    const isEmail = await Users.findOne({ email })
                    if (isEmail) return res.status(409).json({ message: "ອີແມວນີ້ມີໃນລະບົບແລ້ວ" })
                    userForm.email = email
                }
                if (userForm) {
                    await Users.findByIdAndUpdate(auth, { $set: userForm }, { new: true })
                }
            }
            const form: any = {
                name, phone, districtId, village
            }
            if (profile) form.profile = profile
            await Customer.findByIdAndUpdate(isCheck_Profile, { $set: form }, { new: true })
            res.status(201).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ" })
            console.log(isCheck_Profile)
        } catch (e) {
            res.status(501).send(e)
        }
    }
}

export default customerController