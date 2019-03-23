import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Next,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { authenticate } from 'passport'
import { AuthService } from './auth.service'
import { CreateUserDto, AuthUserDto } from '../users/dto/index.dto'

type AuthProvider = 'google'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) body: CreateUserDto) {
    return await this.auth.signup(body)
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) body: AuthUserDto) {
    return await this.auth.login(body)
  }

  @Get(':provider(google)')
  async loginWithGoogle(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: AuthProvider,
  ) {
    const params = {
      session: false,
      scope: ['profile', 'email'],
      callbackURL: `${process.env.baseUrl}auth/google/callback`,
    }
    authenticate(provider, params)(req, res, next)
  }

  @Get(':provider(google)/callback')
  async oauthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: AuthProvider,
  ) {
    const params = {
      session: false,
      state: req.query.state,
      callbackURL: `${process.env.baseUrl}auth/google/callback`,
    }
    return authenticate(provider, params, (err, token) => {
      if (err) return next(err)
      res.json(token)
    })(req, res, next)
  }
}
