import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { Issue } from './issue.entity'
import { User } from '../users/user.entity'
import { Label } from '../labels/label.entity'
import { IssueBox } from '../issue-boxes/issue-box.entity'

@Injectable()
export class IssuesService {
  constructor() {}

  async findByUser(user: User): Promise<Issue[]> {
    return await Issue.find({ where: { user: user }, relations: ['labels', 'issueBox'] })
  }

  async create(issue: Issue): Promise<Issue> {
    const issueBox = await IssueBox.findOne(issue.issueBox.id, { relations: ['issues'] })
    issue.boxIndex = issueBox.issues ? issueBox.issues.length : 0
    await issue.save().catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issue
  }

  async update(params: Issue, id: number): Promise<Issue> {
    const issues = await this.findByUser(params.user)
    const issue = issues.find(issue => issue.id === id)
    const oldBoxId = issue.issueBox.id

    Object.keys(params).forEach(key => {
      if (key !== 'id') issue[key] = params[key]
    })
    await issue.save().catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })

    if (typeof params.boxIndex === undefined) return issue

    const newBoxId = issue.issueBox.id
    const boxes = await IssueBox.findByIds(
      [oldBoxId, newBoxId],
      { relations: ['issues'] }
    )
    boxes.forEach(box => {
      let issues = box.issues.sort((a, b) => a.boxIndex - b.boxIndex)

      if (box.id === newBoxId) {
        issues = issues.filter(i => i.id !== issue.id)
        issues.splice(issue.boxIndex, 0, issue)
      }

      issues.forEach((issue, index) => {
        issue.boxIndex = index
        issue.save()
      })
    })
    return issue
  }

  async addLabels(issue: Issue, labels: Label[]): Promise<Issue> {
    await Issue.CreateWithLabels(issue.id, labels.map(l => l.id))
    return issue
  }

  delete(issue: Issue): void {
    Issue
      .delete({ id: issue.id, user: issue.user })
      .catch(e => {
        console.log(e)
        throw new RecordInvalidException(e.detail)
      })
  }
}
