import { v4 as uuidv4 } from 'uuid'

import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import Chat from '../chat/Chat.model'
import User from '../user/User.model'

@Entity()
export default class Message {
  @PrimaryColumn('uuid')
    id: string

  @ManyToOne(() => Chat)
    chat: Chat

  @ManyToOne(() => User)
    from: User

  @Column()
    text: string

  @Column()
    createDate: Date

  @Column()
    lastUpdate: Date

  static create (options: {chat: Chat, from: User, text: string}) {
    const message = new Message()

    message.id = uuidv4()
    message.chat = options.chat
    message.from = options.from
    message.text = options.text
    message.createDate = new Date()
    message.lastUpdate = new Date()

    return message
  }
}
