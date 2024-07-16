import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordSchema = z
  .string()
  .min(8, 'Password must have at least 8 characters.')
  .max(255, 'Password must have at most 255 characters.')
  .regex(/[a-z]/, 'Password must have at least one lowercase letter.')
  .regex(/[A-Z]/, 'Password must have at least one uppercase letter.')
  .regex(/\d/, 'Password must have at least one digit.')
  .regex(/[@$!%*?&]/, 'Password must have at least one simbol.')
  .refine((value) => passwordRegex.test(value), {
    message: 'Password does not meet the requirements.',
  });

export const userSignupSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: passwordSchema,
});

export type UserSignupSchema = z.infer<typeof userSignupSchema>;
