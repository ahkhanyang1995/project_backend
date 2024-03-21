import { Router, Request, Response } from 'express'
import { isAdmin } from '@/plugins/passport'
import uploadMuseum  from '@/service/Upload-Museum'
const router: Router = Router()
router.route("/upload-museum")
    .post(isAdmin,uploadMuseum)
export default router