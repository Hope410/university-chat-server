import ErrorType from './types/ErrorType'

export default class ServerError {
  type: ErrorType
  message: string

  constructor (options: {
    type: ErrorType;
    message: string;
  }) {
    this.type = options.type
    this.message = options.message
  }
}
