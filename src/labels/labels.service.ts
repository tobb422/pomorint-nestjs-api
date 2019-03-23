import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { Label } from './label.entity'
import { User } from '../users/user.entity'
import { CreateLabelDto } from './dto/create-label.dto'
// import { CreateUserDto, UpdateUserDto, GoogleUserDto } from './dto/index.dto'

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async findAll(user: User): Promise<Label[]> {
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

  async update(user: User, id: number, dto: CreateLabelDto): Promise<Label> {
    await this.labelRepository.update({ id: id, user: user }, dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return (await this.findById(id)) as Label
  }

  delete(user: User, id: number): void {
    this.labelRepository.delete({ id: id, user: user }).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
  }
}
