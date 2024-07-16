import { paginationQuerySchema } from '@/common';
import { z } from 'zod';

export const listWordsQuerySchema = paginationQuerySchema.extend({
  search: z.string().optional(),
});

export type ListWordsQuerySchema = z.infer<typeof listWordsQuerySchema>;
