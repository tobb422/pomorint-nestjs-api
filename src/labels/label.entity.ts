import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity('labels')
export class Label extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name: string

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}
