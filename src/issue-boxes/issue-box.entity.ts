import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { User } from '../users/user.entity'
import { Issue } from '../issues/issue.entity'

@Entity('issue-boxes')
export class IssueBox extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name: string

  @ManyToOne(type => User, user => user.labels)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(type => Issue, issue => issue.labels, { nullable: true })
  issues?: Issue[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
