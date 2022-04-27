import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import Chat from '../chat/Chat.model'
import User from '../user/User.model'

@Entity()
export default class Group {
  @PrimaryColumn()
    id: string

  @Column()
    title: string

  @ManyToOne(() => User)
    lead: User

  @ManyToMany(() => User)
    members: User[]

  @ManyToOne(() => Chat)
    chat: Chat
}
