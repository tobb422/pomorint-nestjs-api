import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { IssueBox } from './issue-box.entity'
import { User } from '../users/user.entity'

@Injectable()
export class IssueBoxesService {
  constructor(
    @InjectRepository(IssueBox)
    private readonly issueBoxRepository: Repository<IssueBox>,
  ) {}

  async findByUser(user: User): Promise<IssueBox[]> {
    return await this.issueBoxRepository.find({ user: user })
  }

  async create(issueBox: IssueBox): Promise<IssueBox> {
    await this.issueBoxRepository.insert(issueBox).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issueBox
  }

  async update(issueBox: IssueBox): Promise<IssueBox> {
    await this.issueBoxRepository.update(
      { id: issueBox.id, user: issueBox.user },
      issueBox
    ).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issueBox
  }

  delete(issueBox: IssueBox): void {
    this.issueBoxRepository
      .delete({ id: issueBox.id, user: issueBox.user })
      .catch(e => {
        console.log(e)
        throw new RecordInvalidException(e.detail)
      })
  }
}
