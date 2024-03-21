import { Router, Request, Response } from 'express'
import { isCustomer } from '@/plugins/passport'
import customerController from '../controller/CustomerController'
import { customerSignIn } from '@/middlewares/auth'
import { userValidator } from "../Validator/UserValidator"
const router: Router = Router()
router.route("/register-customer-client")
    .post(customerController.registerCustomer)
router.route("/get-province-client")
    .get(customerController.getProvince)
router.route("/show_customer")
    .post(customerController.show_customer)

router.route("/customer-login")
    .post(userValidator, customerSignIn, customerController.customer_login)

router.route("/customer-profile")
    .get(isCustomer, customerController.customer_profile)

router.route("/update-customer")
    .post(isCustomer, customerController.update_customerProfile)

export default router