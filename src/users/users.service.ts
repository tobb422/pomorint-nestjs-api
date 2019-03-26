import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RecordInvalidException } from '../exception'
import { User } from './user.entity'
import { CreateUserDto, UpdateUserDto, GoogleUserDto } from './dto/index.dto'
import { Label } from '../labels/label.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email: email })
  }

  async create(dto: CreateUserDto): Promise<User> {
    await this.userRepository.insert(dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return dto as User
  }

  async createWithGoogle(dto: GoogleUserDto): Promise<User> {
    await this.userRepository.insert(dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return dto as User
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return (await this.findById(id)) as User
  }

  delete(id: number): void {
    this.userRepository.delete(id).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
  }

  async findLabels(id: number): Promise<Label[]> {
    const user = await this.userRepository.findOne(id, { relations: ['labels'] })
    return user.labels
  }
}
