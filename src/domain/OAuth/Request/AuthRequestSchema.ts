import {checkSchema} from 'express-validator/check'

export const validateAuthBody = checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'email is missing',
    isEmail: {
      bail: true,
    },
  },
  password: {
    in: ['body'],
    errorMessage: 'password is missing',
  },
})

export const AuthTokenRequestSchema = [
  ...validateAuthBody,
]
