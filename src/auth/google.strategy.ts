import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  Profile,
  Strategy,
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-google-oauth20'
import { AuthService } from './auth.service'
import { GoogleUserDto } from '../users/dto/google-user.dto'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(auth: AuthService) {
    super(
      <StrategyOptionWithRequest>{
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}auth/google/callback`,
        passReqToCallback: true,
      },
      <VerifyFunctionWithRequest>(async (
        req, // express request object
        access, // access token from Google
        refresh, // refresh token from Google
        profile, // user profile, parsed by passport
        done,
      ) => {
        const user = {
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          name: profile.displayName,
        } as GoogleUserDto

        return auth
          .validateWithGoogle(user)
          .then(result => done(null, result))
          .catch(error => done(error))
      }),
    )
  }
}
