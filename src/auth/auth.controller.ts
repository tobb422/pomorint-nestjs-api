import { Controller, Get, Req, Res, Next, Param } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { authenticate } from 'passport';

type AuthProvider = 'google';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get(':provider(google)')
  async signin(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: AuthProvider
  ) {
    const params = {
      session: false,
      scope: ['profile', 'email'],
      callbackURL: `${process.env.baseUrl}auth/google/callback`,
    };
    authenticate(provider, params)(req, res, next);
  }

  @Get(':provider(google)/callback')
  async callback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: AuthProvider
  ) {
    const params = {
      session: false,
      state: req.query.state,
      callbackURL: `${process.env.baseUrl}auth/google/callback`,
    };
    return authenticate(provider, params, (err, token) => {
      if (err) return next(err);
      res.json(token);
    })(req, res, next);
  }
}
