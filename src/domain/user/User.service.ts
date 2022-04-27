import AppDataSource from '@/data-source'
import ServerError from '@/lib/server-error/ServerError.model'
import ErrorType from '@/lib/server-error/types/ErrorType'
import _ from 'lodash'
import { USER_NOT_FOUND } from './errors'
import User from './User.model'

export default class UserService {
  static async getUserById (query: {id: string}) {
    const user = await AppDataSource.manager.findOneBy(User, {
      id: query.id
    })

    if (_.isNull(user)) {
      throw new ServerError({ type: ErrorType.BAD_REQUEST, message: USER_NOT_FOUND })
    }

    return user
  }
}
