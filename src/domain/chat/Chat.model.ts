import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn
} from 'typeorm'
import Message from '../message/Message.model'
import User from '../user/User.model'

@Entity()
export default class Chat {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    title: string

  @ManyToOne(() => User)
    owner: User

  @ManyToMany(() => User)
  @JoinTable()
    members: User[]

  @OneToMany(() => Message, (message) => message.chat)
    messages: Message[]
}
