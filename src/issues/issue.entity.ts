import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable
} from 'typeorm'
import { DateEntity } from '../common/entity/date.entity'
import { User } from '../users/user.entity'
import { Label } from '../labels/label.entity'
import { IssueBox } from '../issue-boxes/issue-box.entity'

@Entity('issues')
export class Issue extends BaseEntity {
  constructor(init?: Partial<Issue>) {
    super()
    Object.assign(this, init)
    return this
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'title' })
  title: string

  @Column('text', { name: 'description' })
  description: string

  @Column({ name: 'estimate_point' })
  estimatePoint: number

  @Column({ name: 'result_point', default: 0 })
  resultPoint: number

  @Column({ name: 'box_index' })
  boxIndex: number

  @Column({ name: 'archived', default: false })
  archived: boolean

  @ManyToOne(type => User, user => user.issues)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(type => IssueBox, issueBox => issueBox.issues)
  @JoinColumn({ name: 'issue_box_id' })
  issueBox: IssueBox

  @ManyToMany(
    type => Label,
    label => label.issues
  )
  @JoinTable({
    name: 'issue_labels',
    joinColumn: { name: 'issue_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'label_id', referencedColumnName: 'id' },
  })
  labels?: Label[]

  @Column(type => DateEntity)
  date: DateEntity

  static CreateWithLabels(issueId: number, labelIds: number[]) {
    this.createQueryBuilder('issues')
        .relation(Issue, 'labels')
        .of(issueId)
        .add(labelIds)
  }
}
