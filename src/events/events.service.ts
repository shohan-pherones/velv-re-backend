import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { dateTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async delete(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.event.delete({
      where: { id },
    });
  }
}
