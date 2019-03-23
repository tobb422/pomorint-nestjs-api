import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordInvalidException } from '../exception';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, GoogleUserDto } from './dto/index.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ id });
  }

  async findByGoogleId(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ googleId: id });
  }

  async create(dto: CreateUserDto): Promise<User> {
    await this.userRepository.insert(dto).catch(e => {
      console.log(e);
      throw new RecordInvalidException(e.detail);
    });
    return dto as User;
  }

  async createWithGoogle(dto: GoogleUserDto): Promise<User> {
    await this.userRepository.insert(dto).catch(e => {
      console.log(e);
      throw new RecordInvalidException(e.detail);
    });
    return dto as User;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, dto).catch(e => {
      console.log(e);
      throw new RecordInvalidException(e.detail);
    });
    return dto as User;
  }

  delete(id: number): void {
    this.userRepository.delete(id).catch(e => {
      console.log(e);
      throw new RecordInvalidException(e.detail);
    });
  }
}
