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
    const issueBoxes = await this.issueBoxesService.findByUser(req.user)
    const box = issueBoxes.find(box => box.id === body.issueBox.id)
    const issue = new Issue({ user: req.user, listIndex: box.issues.length, ...body })
    return this.issuesService.create(issue)
  }

  @Put(':id')
  @HttpCode(201)
  async update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: UpdateIssueDto,
  ): Promise<Issue> {
    const issues = await this.issuesService.findByUser(req.user)
    const issue = issues.find(issue => issue.id === id)
    Object.keys(body).forEach(key => {
      if (key !== 'id') issue[key] = body[key]
    })
    return this.issuesService.update(issue)
  }

  @Put(':id/archived')
  @HttpCode(201)
  archived(
    @Req() req,
    @Param('id', new ParseIntPipe()) id
  ): Promise<Issue> {
    const issue = { id: id, user: req.user, archived: true } as Issue
    return this.issuesService.update(issue)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Req() req, @Param('id', new ParseIntPipe()) id): void {
    const issue = { id: id, user: req.user } as Issue
    return this.issuesService.delete(issue)
  }
}
