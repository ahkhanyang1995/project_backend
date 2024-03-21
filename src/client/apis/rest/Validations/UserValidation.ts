import Joi from 'joi'

export const customerlogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})