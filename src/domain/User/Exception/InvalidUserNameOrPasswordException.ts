export class InvalidUserNameOrPasswordException extends Error {
  constructor (message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}
