import { BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export function validateWithZod<T>(schema: ZodSchema<T>, data: unknown): T {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new BadRequestException(parsed.error.flatten().fieldErrors);
  }

  return parsed.data;
}
