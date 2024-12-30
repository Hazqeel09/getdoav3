import { z } from 'zod';

export const paginationParamsSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1),
});
