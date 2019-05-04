import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { IssueBox } from './issue-box.entity'
import { Issue } from '../issues/issue.entity'
import { User } from '../users/user.entity'

@Injectable()
export class IssueBoxesService {
  constructor() {}

  static DefaultBoxes: IssueBox[] = [
    new IssueBox({ name: 'IceBox' }),
    new IssueBox({ name: 'ToDo' }),
    new IssueBox({ name: 'InProgress' }),
    new IssueBox({ name: 'Done' })
  ]

  async findByUser(user: User): Promise<IssueBox[]> {
    return await IssueBox.find({
      where: [{ user: user }],
      relations: ['issues', 'issues.labels'],
      order: { id: 'ASC' }
    }).then(res => res.map(r => {
      r.issues = r.issues.sort((a, b) => a.boxIndex - b.boxIndex)
      return r
    }))
  }

  async create(issueBox: IssueBox): Promise<IssueBox> {
    await issueBox.save().catch(e => {
      throw new RecordInvalidException(e.detail)
    })
    return issueBox
  }

  async update(params: IssueBox, id: number): Promise<IssueBox> {
    const box = await IssueBox.findOne(id, {
      relations: ['issues', 'issues.labels']
    })
    Object.keys(params).forEach(key => {
      if (key !== 'id') box[key] = params[key]
    })
    await box.save().catch(e => {
      throw new RecordInvalidException(e.detail)
    })
    return box
  }

  async delete(issueBox: IssueBox): Promise<void> {
    const box = await IssueBox.findOne(issueBox.id, {
      relations: ['issues', 'issues.labels']
    })

    const issues = box.issues
    if (issues.length > 0) {
      await Issue.delete(box.issues.map(i => i.id))
    }
    await IssueBox
      .delete({ id: issueBox.id, user: issueBox.user })
      .catch(e => {
        throw new RecordInvalidException(e.detail)
      })
  }
}
