import { Request, Response, NextFunction } from "express"
import { customerlogin } from "../Validations/UserValidation"
export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await customerlogin.validateAsync(req.body)
  } catch (e:any) {
    return res.status(400).json({ error: e.details[0].message })
  }
  next()
}
