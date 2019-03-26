import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { Issue } from './issue.entity'
import { User } from '../users/user.entity'

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) {}

  async findByUser(user: User): Promise<Issue[]> {
    return await this.issueRepository.find({ user: user })
  }

  async findById(id: number): Promise<Issue | undefined> {
    return await this.issueRepository.findOne(id)
  }

  async create(issue: Issue): Promise<Issue> {
    await this.issueRepository.insert(issue).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issue
  }

  async update(issue: Issue): Promise<Issue> {
    await this.issueRepository.update(
      { id: issue.id, user: issue.user },
      issue
    ).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issue
  }

  delete(issue: Issue): void {
    this.issueRepository
      .delete({ id: issue.id, user: issue.user })
      .catch(e => {
        console.log(e)
        throw new RecordInvalidException(e.detail)
      })
  }
}
