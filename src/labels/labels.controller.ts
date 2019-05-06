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

  @Get()
  async finAll(@Req() req): Promise<Label[]> {
    return this.labelsService.findByUser(req.user)
  }

  @Post()
  @HttpCode(201)
  async create(
    @Req() req,
    @Body(new ValidationPipe()) body: CreateLabelDto,
  ): Promise<Label> {
    const label = new Label({ user: req.user, ...body })
    return this.labelsService.create(label)
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Body(new ValidationPipe()) body: CreateLabelDto,
  ): Promise<Label> {
    const label = { id: id, user: req.user, ...body } as Label
    return this.labelsService.update(label)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Req() req, @Param('id', new ParseIntPipe()) id): void {
    const label = { id: id, user: req.user } as Label
    return this.labelsService.delete(label)
  }
}
