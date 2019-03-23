import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CustomAuthGuard } from './auth.gurad'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomAuthGuard
    }
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
