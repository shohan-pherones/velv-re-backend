import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  image: z.string().url('Image must be a valid URL').optional(),
  dateTime: z.coerce.date({ required_error: 'DateTime is required' }),
  location: z.string().min(1, 'Location is required'),
  maxAttendees: z
    .number()
    .int()
    .positive('Max attendees must be a positive integer'),
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>;
