import { DataSource } from 'typeorm'

import 'reflect-metadata'

import Chat from './domain/chat/Chat.model'
import Course from './domain/course/Course.model'
import Department from './domain/department/Department.model'
import Group from './domain/group/Group.model'
import Institute from './domain/institute/Institute.model'
import Message from './domain/message/Message.model'
import User from './domain/user/User.model'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  entities: [
    Chat,
    Course,
    Department,
    Group,
    Institute,
    Message,
    User
  ],
  migrations: [],
  subscribers: []
  // logging: ['query', 'error'],
})

export default AppDataSource
