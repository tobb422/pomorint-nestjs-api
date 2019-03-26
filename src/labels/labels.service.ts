import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { Label } from './label.entity'
import { User } from '../users/user.entity'

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async findByUser(user: User): Promise<Label[]> {
    return await this.labelRepository.find({ user: user })
  }

  async findById(id: number): Promise<Label | undefined> {
    return await this.labelRepository.findOne(id)
  }

  async create(label: Label): Promise<Label> {
    await this.labelRepository.insert(label).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return label
  }

  async update(label: Label): Promise<Label> {
    await this.labelRepository.update(
      { id: label.id, user: label.user },
      label
    ).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return label
  }

  delete(label: Label): void {
    this.labelRepository
        .delete({ id: label.id, user: label.user })
        .catch(e => {
          console.log(e)
          throw new RecordInvalidException(e.detail)
        })
  }
}
