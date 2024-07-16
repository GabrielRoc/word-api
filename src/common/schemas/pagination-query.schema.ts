import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).default(10),
});

export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>;
