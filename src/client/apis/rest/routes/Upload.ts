import { Router, Request, Response } from 'express'
import { isAdmin } from '@/plugins/passport'
import uploadImage from '@/service/formidable'
const router: Router = Router()
router.route("/upload-image")
    .post(uploadImage)
export default router