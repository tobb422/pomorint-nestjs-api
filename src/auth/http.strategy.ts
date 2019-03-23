import { Strategy } from 'passport-http-bearer'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UnauthorizedException } from '@nestjs/common'

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super()
  }

  async validate(token: string) {
    const user = await this.auth.validate(token)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
