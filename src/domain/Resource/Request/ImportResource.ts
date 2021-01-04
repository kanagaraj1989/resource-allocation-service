import {checkSchema} from 'express-validator/check'

const validateQuery = checkSchema({
  '.*.email': {
    in: ['body'],
    isEmail: true,
    errorMessage: 'email is missing',
  },
  '.*.phoneNo': {
    in: ['body'],
    isString: true,
    errorMessage: 'phone no is missing',
  },
  '.*.startDate': {
    in: ['body'],
    errorMessage: 'StartDate is missing',
    isISO8601: true,
  },
  '.*.endDate': {
    in: ['body'],
    errorMessage: 'endDate is missing',
    isISO8601: true,
  },
  '.*.skill': {
    in: ['body'],
    errorMessage: 'skill is missing',
  }
})

export const importResource = [
  ...validateQuery,
]
