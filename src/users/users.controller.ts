import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<User | null> {
    return this.usersService.findById(params.id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body): Promise<User> {
    return this.usersService.create(body as CreateUserDto);
  }
}
