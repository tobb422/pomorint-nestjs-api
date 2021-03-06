import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { DateEntity } from '../common/entity/date.entity'
import { User } from '../users/user.entity'
import { Issue } from '../issues/issue.entity'

@Entity('issue_boxes')
export class IssueBox extends BaseEntity {
  constructor(init?: Partial<IssueBox>) {
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

  @OneToMany(type => Issue, issue => issue.issueBox, { nullable: true })
  issues?: Issue[]

  @Column(type => DateEntity, { prefix: false })
  date: DateEntity

  static async findOneWithIssues(id): Promise<IssueBox> {
    return await IssueBox.findOne(id, {
      relations: ['issues', 'issues.labels']
    })
  }
}
