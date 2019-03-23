import {
  Controller,
  Get,
  Put,
  Delete,
  Req,
  Param,
  Body,
  HttpCode,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { UpdateUserDto } from './dto/index.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  async info(@Req() req): Promise<User> {
    return req.user
  }

  @Get('all')
  async finAll(@Req() req): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id): void {
    return this.usersService.delete(id)
  }
}
