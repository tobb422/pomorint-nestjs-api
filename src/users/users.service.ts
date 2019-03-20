import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    await this.userRepository.insert(dto);
    return dto as User
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, dto);
    return dto as User
  }
}
