import { Router, Request, Response } from 'express'
import { isAdmin } from '@/plugins/passport'
import userController from '../controller/UserController'
import { adminSignIn } from '../../../../middlewares/auth'
import { userValidator, logins } from '@/admin/Validator/UserValidator'
const router: Router = Router()
router.route('/register-user-admin')
    .post( userController.add_User)

router.route('/show-user-list-admin')
    .get(isAdmin, userController.show_user)

router.route('/edit-user-info-admin/:_id')
    .get(isAdmin, userController.edit_user)

router.route('/admin-sigin')
    .post(logins, adminSignIn, userController.adminLogin)
export default router