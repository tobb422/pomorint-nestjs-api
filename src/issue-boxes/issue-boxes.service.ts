import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { IssueBox } from './issue-box.entity'
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
      relations: ['issues', 'issues.labels']
    })
  }

  async create(issueBox: IssueBox): Promise<IssueBox> {
    await IssueBox.insert(issueBox).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issueBox
  }

  async update(issueBox: IssueBox): Promise<IssueBox> {
    await IssueBox.update(
      { id: issueBox.id, user: issueBox.user },
      issueBox
    ).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issueBox
  }

  delete(issueBox: IssueBox): void {
    IssueBox
      .delete({ id: issueBox.id, user: issueBox.user })
      .catch(e => {
        console.log(e)
        throw new RecordInvalidException(e.detail)
      })
  }
}
