import AppDataSource from '@/data-source'
import ChatService from '../chat/Chat.service'
import Message from '../message/Message.model'
import UserService from '../user/User.service'

export default class MessageService {
  static async sendMessage (query: {fromId: string; chatId: string; text: string}) {
    const message = Message.create({
      chat: await ChatService.getChatById({ id: query.chatId }),
      from: await UserService
        .getUserById({ id: query.fromId }),
      text: query.text
    })

    await AppDataSource.manager.save(message)
  }
}
