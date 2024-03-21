import { Request, Response } from 'express'
import { loginToken, signToken } from '@/utils/jwt'
const userController = {
  login: async (req: Request, res: Response) => {
    try {
      const auth = req.user
      // console.log(auth)
      const token = signToken(auth)
      res.status(200).json({ token })
    } catch (e: any) {
      throw new Error(e)
    }
  }
}
export default userController