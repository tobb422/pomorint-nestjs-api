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
import { IssuesService } from './issues.service'
import { Issue } from './issue.entity'
import { CreateIssueDto, UpdateIssueDto } from './dto/index.dto'

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService
  ) {}

  @Get()
  async finAll(@Req() req): Promise<Issue[]> {
    return this.issuesService.findByUser(req.user)
  }

  @Post()
  @HttpCode(201)
  async create(
    @Req() req,
    @Body(new ValidationPipe()) body: CreateIssueDto,
  ): Promise<Issue> {
    const issue = new Issue({ user: req.user, ...body })
    return this.issuesService.create(issue)
  }

  @Put(':id')
  @HttpCode(201)
  async update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: UpdateIssueDto,
  ): Promise<Issue> {
    const issue = new Issue({ user: req.user, ...body })
    return this.issuesService.update(issue, id)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Req() req, @Param('id', new ParseIntPipe()) id): void {
    const issue = { id: id, user: req.user } as Issue
    return this.issuesService.delete(issue)
  }
}
