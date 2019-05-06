import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { CustomAuthGuard } from './auth.gurad'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { LabelsModule } from './labels/labels.module'
import { IssuesModule } from './issues/issues.module'
import { IssueBoxesModule } from './issue-boxes/issue-boxes.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    LabelsModule,
    IssuesModule,
    IssueBoxesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
