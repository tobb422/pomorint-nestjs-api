import { Injectable } from '@nestjs/common'
import { RecordInvalidException } from '../exception'
import { User } from './user.entity'
import { CreateUserDto, UpdateUserDto, GoogleUserDto } from './dto/index.dto'
import { Label } from '../labels/label.entity'

@Injectable()
export class UsersService {
  constructor() {}

  async findAll(): Promise<User[]> {
    return await User.find()
  }

  async findById(id: number): Promise<User | undefined> {
    return await User.findOne(id)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await User.findOne({ email: email })
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User()
    user.email = dto.email
    user.password = dto.password
    user.name = dto.name
    return user.save().catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
  }

  async createWithGoogle(dto: GoogleUserDto): Promise<User> {
    await User.insert(dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return dto as User
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await User.update(id, dto).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
    return (await this.findById(id)) as User
  }

  delete(id: number): void {
    User.delete(id).catch(e => {
      console.log(e)
      throw new RecordInvalidException(e.detail)
    })
  }

  async findLabels(id: number): Promise<Label[]> {
    const user = await User.findOne(id, { relations: ['labels'] })
    return user.labels
  }
}
