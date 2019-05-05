import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Param,
  Body,
  HttpCode,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common'
import { IssueBoxesService } from './issue-boxes.service'
import { IssueBox } from './issue-box.entity'
import { Issue } from '../issues/issue.entity'
import { CreateIssueBoxDto } from './dto/create-issue-box.dto'

@Controller('issue-boxes')
export class IssueBoxesController {
  constructor(private readonly issueBoxesService: IssueBoxesService) {}

  @Get()
  async finAll(@Req() req): Promise<IssueBox[]> {
    return this.issueBoxesService.findByUser(req.user)
  }

  @Post()
  @HttpCode(201)
  async create(
    @Req() req,
    @Body(new ValidationPipe()) body: CreateIssueBoxDto,
  ): Promise<IssueBox> {
    const params = {
      user: req.user,
      issues: [] as Issue[],
      ...body
    }
    const issueBox = new IssueBox(params)
    return this.issueBoxesService.create(issueBox)
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: CreateIssueBoxDto,
  ): Promise<IssueBox> {
    const params = {
      user: req.user,
      ...body
    }
    const issueBox = new IssueBox(params)
    return this.issueBoxesService.update(issueBox, id)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Req() req, @Param('id', new ParseIntPipe()) id): Promise<void> {
    const issueBox = new IssueBox({ id: id, user: req.user })
    return this.issueBoxesService.delete(issueBox)
  }
}
