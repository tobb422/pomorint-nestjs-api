import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { Issue } from './issue.entity'
import { User } from '../users/user.entity'
import { Label } from '../labels/label.entity'

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) {}

  async findByUser(user: User): Promise<Issue[]> {
    return await this.issueRepository.find({ where: { user: user, archived: false }, relations: ['labels'] },)
  }

  async create(issue: Issue): Promise<Issue> {
    await this.issueRepository.save(issue).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issue
  }

  async update(issue: Issue): Promise<Issue> {
    const updateLabels = issue.labels
    await this.issueRepository.save(issue).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return issue
  }

  async addLabels(issue: Issue, labels: Label[]): Promise<Issue> {
    await Issue.CreateWithLabels(issue.id, labels.map(l => l.id))
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