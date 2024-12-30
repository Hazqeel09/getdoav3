import { z } from "zod";
import {
  createDoaRequestSchema,
  deleteDoaParamsSchema,
  listDoasParamsSchema,
  retrieveDoaParamsSchema,
  updateDoaParamsSchema,
  updateDoaRequestSchema,
} from "~/schemas/doas";
import { Prisma } from '@prisma/client';

const doaWithRelations = Prisma.validator<Prisma.DoaFindFirstArgs>()({
  include: {
    categories: { include: { category: true } },
    sources: { include: { source: true } }
  },
})
type DoaWithRelations = Prisma.DoaGetPayload<typeof doaWithRelations>
export type DoaResponse = DoaWithRelations

export type ListDoasParams = z.infer<typeof listDoasParamsSchema>;
export type ListDoasResponse = {
  data: DoaResponse[];
  total: number;
};
export type RetrieveDoaParams = z.infer<typeof retrieveDoaParamsSchema>;
export type RetrieveDoaResponse = DoaResponse;
export type CreateDoaRequest = z.infer<typeof createDoaRequestSchema>;
export type CreateDoaResponse = DoaResponse;
export type UpdateDoaParams = z.infer<typeof updateDoaParamsSchema>;
export type UpdateDoaRequest = z.infer<typeof updateDoaRequestSchema>;
export type UpdateDoaResponse = DoaResponse
export type DeleteDoaParams = z.infer<typeof deleteDoaParamsSchema>;
export type DeleteDoaResponse = { id: number };
