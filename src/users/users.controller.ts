import { Controller, Get, Post, Put, Param, Body, HttpCode } from '@nestjs/common';
import { NotFoundException } from '../exception';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param() params): Promise<User> {
    const user = await this.usersService.findById(params.id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  @HttpCode(201)
  create(@Body() body): Promise<User> {
    return this.usersService.create(body as CreateUserDto);
  }

  @Put(':id')
  @HttpCode(201)
  update(@Param() params, @Body() body): Promise<User> {
    return this.usersService.update(params.id, body as UpdateUserDto);
  }
}
