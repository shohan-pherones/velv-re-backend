import { z } from 'zod';

export const UpdateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  dateTime: z.coerce.date().optional(),
  location: z.string().min(1).optional(),
  maxAttendees: z.number().int().positive().optional(),
});

export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;
