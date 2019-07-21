import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { NotFoundException, UnauthorizedException } from '../shared/exception'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import {
  AuthUserDto,
  CreateUserDto,
  GoogleUserDto,
} from '../users/dto/index.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  static createToken(payload: User): any {
    return jwt.sign({ email: payload.email }, 'secret', { expiresIn: '24h' })
  }

  async signup(dto: CreateUserDto) {
    const user = await this.usersService.create(dto)
    return AuthService.createToken(user)
  }

  async login(dto: AuthUserDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new NotFoundException()
    if (dto.password !== user.password) throw new UnauthorizedException()
    return AuthService.createToken(user)
  }

  async validateWithGoogle(dto: GoogleUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email)
    return AuthService.createToken((!!user
      ? user
      : await this.usersService.createWithGoogle(dto)) as User)
  }

  async validate(token: string): Promise<any> {
    const email = jwt.verify(token, 'secret').email
    return await this.usersService.findByEmail(email)
  }
}
