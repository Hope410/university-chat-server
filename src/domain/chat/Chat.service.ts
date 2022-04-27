import _ from 'lodash'
import AppDataSource from 'src/data-source'
import Chat from './Chat.model'

import { CHAT_DOESNT_EXIST, USER_ALREADY_JOINED } from './errors'
import { FindOptionsRelations } from 'typeorm'
import UserService from '../user/User.service'
import ServerError from '@/lib/server-error/ServerError.model'
import ErrorType from '@/lib/server-error/types/ErrorType'

export default class ChatService {
  static async getChatById (query: {id: string}, relations?: FindOptionsRelations<Chat>) {
    const chat = await AppDataSource.manager.findOne(Chat, {
      relations,
      where: {
        id: query.id
      }
    })

    if (_.isNull(chat)) {
      throw new ServerError({ type: ErrorType.BAD_REQUEST, message: CHAT_DOESNT_EXIST })
    }

    return chat
  }

  static async getChatsByUser (query: { userId: string }) {
    return AppDataSource.manager.find(Chat, {
      relations: {
        members: true
      },
      where: {
        members: {
          id: query.userId
        }
      }
    })
  }

  static async joinChat (query: { userId: string; chatId: string }) {
    const chat = await ChatService.getChatById({ id: query.chatId }, { members: true })

    if (!_.isNull(chat.members.find((member) => member.id === query.userId))) {
      throw new ServerError({ type: ErrorType.BAD_REQUEST, message: USER_ALREADY_JOINED })
    }

    await UserService
      .getUserById({ id: query.userId })
      .then(chat.members.push)

    await AppDataSource.manager.save(chat)

    return chat
  }
}
