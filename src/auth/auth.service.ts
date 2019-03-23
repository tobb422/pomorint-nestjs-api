import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { GoogleUserDto } from '../users/dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  createToken(payload: User): any {
    return jwt.sign(
      { email: payload.email },
      'secret',
      { expiresIn: '24h' }
    );
  }

  async validateWithGoogle(dto: GoogleUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);
    return this.createToken((!!user ? user : this.usersService.createWithGoogle(user)) as User);
  }

  async validate(token: string): Promise<any> {
    const email = jwt.verify(token, 'secret').email;
    return await this.usersService.findByEmail(email);
  }
}
