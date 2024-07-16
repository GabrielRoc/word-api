import { z } from 'zod';

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters.')
    .max(255, 'Password must have at most 255 characters.'),
});

export type UserSigninSchema = z.infer<typeof userSigninSchema>;
