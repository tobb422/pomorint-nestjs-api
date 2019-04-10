import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Length, IsEmail } from 'class-validator'
import { Label } from '../labels/label.entity'
import { Issue } from '../issues/issue.entity'
import { IssueBox } from '../issue-boxes/issue-box.entity'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'password', nullable: true })
  @Length(8, 16)
  password?: string

  @Column({ name: 'email', unique: true })
  @IsEmail()
  email: string

  @Column({ name: 'image', unique: true, nullable: true })
  image?: string

  @OneToMany(type => Label, label => label.user, { cascade: true, nullable: true })
  labels?: Label[]

  @OneToMany(type => Issue, issue => issue.user, { cascade: true, nullable: true })
  issues?: Issue[]

  @OneToMany(type => IssueBox, issueBox => issueBox.user, { cascade: true, nullable: true })
  issueBox?: IssueBox[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
