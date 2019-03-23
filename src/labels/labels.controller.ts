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
import { LabelsService } from './labels.service'
import { Label } from './label.entity'
import { CreateLabelDto } from './dto/create-label.dto'

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('')
  async finAll(@Req() req): Promise<Label[]> {
    return this.labelsService.findAll(req.user)
  }

  @Post()
  @HttpCode(201)
  create(
    @Req() req,
    @Body(new ValidationPipe()) body: CreateLabelDto,
  ): Promise<Label> {
    return this.labelsService.create(Object.assign(body, { user: req.user }) as Label)
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: CreateLabelDto
  ): Promise<Label> {
    return this.labelsService.update(req.user, id, body)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Req() req,
    @Param('id', new ParseIntPipe()) id
  ): void {
    return this.labelsService.delete(req.user, id)
  }
}
