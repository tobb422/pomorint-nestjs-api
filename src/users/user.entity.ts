import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm'
import { Length, IsEmail } from 'class-validator'
import { DateEntity } from '../common/entity/date.entity'
import { Label } from '../labels/label.entity'
import { Issue } from '../issues/issue.entity'
import { IssueBox } from '../issue-boxes/issue-box.entity'

@Entity('users')
export class User extends BaseEntity {
  constructor(init?: Partial<User>) {
    super()
    Object.assign(this, init)
    return this
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name?: string

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
  issueBoxes?: IssueBox[]

  @Column(type => DateEntity)
  date: DateEntity
}
