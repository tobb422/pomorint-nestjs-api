import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { IssueBox } from './issue-box.entity'
import { User } from '../users/user.entity'

@Injectable()
export class IssueBoxesService {
  constructor() {}

  async findByUser(user: User): Promise<IssueBox[]> {
    return await IssueBox.find({ user: user })
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
