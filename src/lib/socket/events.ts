import Chat from '@/domain/chat/Chat.model'
import User from '@/domain/user/User.model'
import ServerError from '../server-error/ServerError.model'

export interface ServerEvents {
  sendChats: (chats: Chat[]) => void;
  newUser: (user: User) => void;
  error: (error: ServerError) => void;
}

export interface ClientEvents {
  initUser: (query: {userId: string}) => void;
  joinChat: (query: {userId: string, chatId: string}) => void;
  sendMessage: (query: {fromId: string, chatId: string, text: string}) => void;
}
