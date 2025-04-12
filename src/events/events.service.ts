import { Injectable } from '@nestjs/common';
import { validateWithZod } from 'src/common/utils/zod-validator';
import { CreateEventDto, CreateEventSchema } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto) {
    const validatedData = validateWithZod(CreateEventSchema, data);

    const event = await this.prisma.event.create({
      data: validatedData,
    });

    return event;
  }
}
