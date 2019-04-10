import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IssueBoxesController } from './issue-boxes.controller'
import { IssueBoxesService } from './issue-boxes.service'
import { IssueBox} from './issue-box.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([IssueBox]),
    UsersModule
  ],
  controllers: [IssueBoxesController],
  providers: [IssueBoxesService],
  exports: [IssueBoxesService],
})
export class IssueBoxesModule {}
