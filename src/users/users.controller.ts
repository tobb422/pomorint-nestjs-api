import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseGuards, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundException } from '../exception';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard('bearer'))
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

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id): void {
    return this.usersService.delete(id);
  }
}
