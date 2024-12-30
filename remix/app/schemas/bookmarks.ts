import { z } from 'zod';

export const addBookmarkRequestSchema = z.object({
  user_id: z.string(),
  doa_id: z.number().optional(),
  compilation_id: z.number().optional(),
}).superRefine((args, ctx)=>{
  if (!args.doa_id && !args.compilation_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Must fill either doa_id or compilation_id.`,
    });
  }
  if (args.doa_id && args.compilation_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Must only fill one of doa_id and compilation_id.`,
    });
  }
  return true
});
export const removeBookmarkRequestSchema = z.object({ user_id: z.string(), id: z.number() });
