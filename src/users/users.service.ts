import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordInvalidException } from '../exception';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const result = await this.userRepository.insert(dto).catch(e => {
      console.log(e);
      return e;
    });
    if (result.detail) throw new RecordInvalidException(result.detail);
    return dto as User;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, dto).catch(e => {
      console.log(e);
      return e
    });
    if (result.detail) throw new RecordInvalidException(result.detail);
    return dto as User;
  }
}
