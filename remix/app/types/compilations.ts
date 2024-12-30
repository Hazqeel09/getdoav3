import { z } from "zod";
import {
  createCompilationRequestSchema,
  deleteCompilationRequestSchema,
  listCompilationsParamsSchema,
  retrieveCompilationRequestSchema,
  updateCompilationRequestSchema,
} from "~/schemas/compilations";
import { Prisma } from '@prisma/client';

const compilationWithDoas = Prisma.validator<Prisma.CompilationFindFirstArgs>()({
  include: {
    doas: { include: { doa: true } },
  },
})
type CompilationWithRelations = Prisma.CompilationGetPayload<typeof compilationWithDoas>
export type CompilationResponse = CompilationWithRelations

export type ListCompilationsParams = z.infer<typeof listCompilationsParamsSchema>;
export type ListCompilationsResponse = {
  data: CompilationResponse[];
  total: number;
};
export type RetrieveCompilationParams = z.infer<typeof retrieveCompilationRequestSchema>;
export type RetrieveCompilationResponse = CompilationResponse;
export type CreateCompilationRequest = z.infer<typeof createCompilationRequestSchema>;
export type CreateCompilationResponse = CompilationResponse;
export type UpdateCompilationRequest = z.infer<typeof updateCompilationRequestSchema>;
export type UpdateCompilationResponse = CompilationResponse
export type DeleteCompilationParams = z.infer<typeof deleteCompilationRequestSchema>;
export type DeleteCompilationResponse = { id: number };
