import { Controller, Get, Post, Put, Param, Body, HttpCode, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { NotFoundException } from '../exception';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Put(':id')
  @HttpCode(201)
  update(@Param('id', new ParseIntPipe()) id, @Body(new ValidationPipe()) body: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, body);
  }
}
