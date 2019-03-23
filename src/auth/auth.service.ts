import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GoogleUserDto } from '../users/dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(user: GoogleUserDto): Promise<any> {
    return await this.usersService.createWithGoogle(user);
  }

  async loginOrSignUpUser(dto: GoogleUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(dto.email);
    return !!user ? user : this.createUser(dto);
  }
}
