import { Controller, Get, Req, Res, Next, Param } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { authenticate } from 'passport';
import { AuthService } from './auth.service';

type AuthProvider = 'google';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get(':provider(google)')
  async handleOauthRequest(
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
  async handleOauthCallback(
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
    // We use callback here, but you can let passport do the redirect
    // http://www.passportjs.org/docs/downloads/html/#custom-callback
    return await authenticate(provider, params, (err, user) => {
      if (err) return next(err);
      res.redirect(`/users/${user.id}`);
    })(req, res, next);
  }
}
