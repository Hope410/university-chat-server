import { Column, Entity, PrimaryColumn } from 'typeorm'
import RoleType from './types/RoleType'

@Entity()
export default class User {
  @PrimaryColumn('uuid')
    id: string

  @Column()
    name: string

  @Column()
    middleName: string

  @Column()
    surname: string

  @Column()
    institute: string

  @Column()
    department: string

  @Column('enum')
    role: RoleType

  @Column()
    isOnline: boolean
}
