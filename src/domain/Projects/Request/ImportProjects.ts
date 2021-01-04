import {checkSchema} from 'express-validator/check'

const validateQuery = checkSchema({
  '.*.name': {
    in: ['body'],
    isEmail: true,
    errorMessage: 'name is missing',
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

export const importProject = [
  ...validateQuery,
]
