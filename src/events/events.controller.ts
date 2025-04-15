import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles('USER', 'ADMIN')
  create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    return this.eventsService.create(createEventDto, req.user!.id);
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  @Roles('USER', 'ADMIN')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Put(':id')
  @Roles('USER', 'ADMIN')
  update(@Param('id') id: string, @Body() body: UpdateEventDto) {
    return this.eventsService.update(id, body);
  }
}
