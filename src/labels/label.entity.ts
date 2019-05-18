import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinColumn
} from 'typeorm'
import { DateEntity } from '../common/entity/date.entity'
import { User } from '../users/user.entity'
import { Issue } from '../issues/issue.entity'

@Entity('labels')
export class Label extends BaseEntity {
  constructor(init?: Partial<Label>) {
    super()
    Object.assign(this, init)
    return this
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name: string

  @ManyToOne(type => User, user => user.labels)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(type => Issue, issue => issue.labels, { nullable: true })
  issues?: Issue[]

  @Column(type => DateEntity, { prefix: false })
  date: DateEntity
}
