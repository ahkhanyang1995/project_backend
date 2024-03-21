import { Router, Request, Response } from 'express'
import { isUser } from '@/plugins/passport'
import userController from '../controller/userController'
import { userSignIn } from '../../../../middlewares/auth'
import uploadImage from '@/service/formidable'
const router: Router = Router()

router.route('/user-login')
  .post(userSignIn, userController.login)

router.route('/upload-image')
  .post(uploadImage)

export default router