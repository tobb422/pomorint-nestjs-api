import { Controller, Get, Post, Put, Param, Body, HttpCode } from '@nestjs/common';
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
  findById(@Param() params): Promise<User | null> {
    return this.usersService.findById(params.id);
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
