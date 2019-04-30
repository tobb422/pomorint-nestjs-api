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
    const issueBox = { user: req.user, ...body } as IssueBox
    return this.issueBoxesService.create(issueBox)
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: CreateIssueBoxDto,
  ): Promise<IssueBox> {
    const issueBox = { id: id, user: req.user, ...body } as IssueBox
    return this.issueBoxesService.update(issueBox)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Req() req, @Param('id', new ParseIntPipe()) id): void {
    const issueBox = { id: id, user: req.user } as IssueBox
    return this.issueBoxesService.delete(issueBox)
  }
}