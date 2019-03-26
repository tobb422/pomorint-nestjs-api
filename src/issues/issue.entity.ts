import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { User } from '../users/user.entity'
import { Label } from '../labels/label.entity'

@Entity('issues')
export class Issue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'title' })
  title: string

  @Column('text', { name: 'description' })
  description: string

  @Column({ name: 'estimate_point' })
  estimatePoint: number

  @Column({ name: 'result_point' })
  resultPoint: number

  @Column({ name: 'archived' })
  archived: boolean

  @ManyToOne(type => User, user => user.issues)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(type => Label, label => label.issues)
  @JoinTable()
  labels?: Promise<Label[]>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
