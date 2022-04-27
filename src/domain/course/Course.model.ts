import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import Chat from '../chat/Chat.model'
import User from '../user/User.model'

@Entity()
export default class Course {
  @PrimaryColumn()
    id: string

  @Column()
    title: string

  @ManyToOne(() => User)
    teacher: User

  @ManyToMany(() => User)
    students: User[]

  @ManyToOne(() => Chat)
    chat: Chat
}
