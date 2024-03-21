import { Router, Request, Response } from 'express'
import Musuem from '@/models/Musuem'
import { isAdmin } from '@/plugins/passport'
import musuemController from '../controller/MuseumController'
const router: Router = Router()
router.route('/add-musuem')
    .post(isAdmin, musuemController.add_mesuem)

router.route('/show_museum')
    .post(isAdmin, musuemController.show_mesuem)

router.route("/deletegallery/:_id")
    .delete(isAdmin, musuemController.deleteMusuem)

    router.route("/updatemuse")
    .post(isAdmin,musuemController.updateMusuem)
export default router