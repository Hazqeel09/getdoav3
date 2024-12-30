import { z } from 'zod';
import { paginationParamsSchema } from './shared';

const listDoasFilterParams = z.object({
  categories: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
});

const doaBodySchema = z.object({
  title_my: z.string().optional(),
  title_en: z.string().optional(),
  text_ar: z.string().optional(),
  text_my: z.string().optional(),
  text_en: z.string().optional(),
  fadhilat_amal_my: z.string().optional(),
  fadhilat_amal_en: z.string().optional(),
  slug: z.string().optional(),
  is_verified: z.boolean().optional(),
  is_public: z.boolean().optional(),
  user_id: z.string().optional(),
  categories: z.array(z.object({
    name: z.string().optional(),
    description: z.string().optional()
  })).optional(),
  sources: z.array(z.object({
    name: z.string().optional(),
    type: z.string().optional()
  })),
});

export const listDoasParamsSchema = paginationParamsSchema.merge(listDoasFilterParams);
export const retrieveDoaParamsSchema = z.object({id: z.number()});
export const createDoaRequestSchema = doaBodySchema;
export const updateDoaParamsSchema = z.object({id: z.number()});
export const updateDoaRequestSchema = doaBodySchema.merge(z.object({id: z.number()}));
export const deleteDoaParamsSchema = z.object({id: z.number()});
