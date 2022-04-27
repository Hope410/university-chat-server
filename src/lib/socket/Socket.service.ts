import * as http from 'http'
import * as io from 'socket.io'

import ChatService from '@/domain/chat/Chat.service'
import UserService from '@/domain/user/User.service'

import { ClientEvents, ServerEvents } from './events'
import ServerError from '../server-error/ServerError.model'
import ErrorType from '../server-error/types/ErrorType'
import { UNKNOWN_ERROR } from '../server-error/errors'

type Socket = io.Socket<ClientEvents, ServerEvents>;

export default class SocketService {
  private io: io.Server<ClientEvents, ServerEvents>

  constructor (server: http.Server) {
    this.io = new io.Server(server)
  }

  public static init (options: {server: http.Server}) {
    return new SocketService(options.server)
  }

  public listen (): void {
    this.io.on('connect', (socket) => {
      socket.on('initUser', this.initUser(socket))
      socket.on('joinChat', this.joinChat(socket))

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }

  private onError (socket: Socket) {
    return (error: unknown) => {
      if (error instanceof ServerError) {
        this.sendErrorMessage(socket, error)
      } else if (error instanceof Error) {
        this.sendErrorMessage(socket,
          new ServerError({
            type: ErrorType.INTERNAL_ERROR,
            message: error.message
          })
        )
      } else {
        this.sendErrorMessage(socket,
          new ServerError({
            type: ErrorType.INTERNAL_ERROR,
            message: UNKNOWN_ERROR
          })
        )
      }
    }
  }

  private sendErrorMessage (socket: Socket, error: ServerError) {
    socket.emit('error', error)
  }

  private initUser (socket: Socket) {
    return (query: {userId: string}) => ChatService.getChatsByUser(query)
      .then(chats => chats.map(chat => chat.id))
      .then(socket.join)
      .catch(this.onError(socket))
  }

  private joinChat (socket: Socket) {
    return (query: {userId: string; chatId: string}) => ChatService.joinChat(query)
      .then(chat => socket.join(chat.id))
      .then(() => UserService.getUserById({ id: query.userId }))
      .then((user) => socket.to(query.chatId).emit('newUser', user))
      .catch(this.onError(socket))
  }
}
