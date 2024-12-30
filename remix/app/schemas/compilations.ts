import { z } from 'zod';
import { paginationParamsSchema } from './shared';

export const listCompilationsParamsSchema = paginationParamsSchema;
export const retrieveCompilationRequestSchema = z.object({ id: z.number() });
export const createCompilationRequestSchema = z.object({
  user_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  slug: z.string().optional(),
  is_public: z.boolean().optional(),
});
export const updateCompilationRequestSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  is_public: z.boolean().optional(),
});
export const deleteCompilationRequestSchema = z.object({ id: z.number() });
