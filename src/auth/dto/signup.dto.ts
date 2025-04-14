import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  image: z.string().url().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
