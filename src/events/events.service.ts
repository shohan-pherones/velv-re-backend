import { Injectable, NotFoundException } from '@nestjs/common';
import { validateWithZod } from 'src/common/utils/zod-validator';
import { CreateEventDto, CreateEventSchema } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEventDto, UpdateEventSchema } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, userId: string) {
    const validatedData = validateWithZod(CreateEventSchema, data);

    const event = await this.prisma.event.create({
      data: {
        ...validatedData,
        user: {
          connect: { id: userId },
        },
      },
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

  async update(id: string, data: UpdateEventDto) {
    const validatedData = validateWithZod(UpdateEventSchema, data);

    const existing = await this.prisma.event.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Event not found');
    }

    const updated = await this.prisma.event.update({
      where: { id },
      data: validatedData,
    });

    return updated;
  }
}
