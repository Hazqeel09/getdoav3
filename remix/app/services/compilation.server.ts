import { CreateCompilationRequest, CreateCompilationResponse, DeleteCompilationParams, DeleteCompilationResponse, ListCompilationsParams, ListCompilationsResponse, RetrieveCompilationParams, RetrieveCompilationResponse, UpdateCompilationRequest, UpdateCompilationResponse } from "~/types/compilations";
import prisma from "~/libs/prisma.server";
import { errorResponseType } from "~/constants/errors";

export const compilationService = {
  list: async ({ limit, page }: ListCompilationsParams): Promise<ListCompilationsResponse | errorResponseType> => {
    try {
      const [data, total] = await Promise.all([
        await prisma.compilation.findMany({
          take: limit,
          skip: (page * limit) - limit,
          orderBy: { created_at: 'desc' },
          include: {
            doas: { include: { doa: true } },
          }
        }),
        await prisma.compilation.count()
      ])
      return { data, total };
    } catch (error) {
      return Response.json({ error: "Unable to fetch compilation list." }, { status: 500 });
    }
  },
  create: async ({
    title,
    description,
    user_id,
    slug,
    is_public,
    doas = [],
  }: CreateCompilationRequest): Promise<CreateCompilationResponse | errorResponseType> => {
    try {
      const compilation = await prisma.compilation.create({
        data: {
          title,
          description,
          user_id,
          slug,
          is_public,
          doas: {
            createMany: {
              data: doas
            }
          }
        },
        include: {
          doas: { include: { doa: true } },
        },
      })
      return compilation;
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to create compilation." }, { status: 500 });
    }
  },
  update: async ({
    id,
    title,
    description,
    slug,
    is_public,
    doas = [],
  }: UpdateCompilationRequest): Promise<UpdateCompilationResponse | errorResponseType> => {
    try {
      const compilation = await prisma.compilation.update({
        data: {
          title,
          description,
          slug,
          is_public,
          doas: {
            connectOrCreate: doas.map(i => ({
              where: { id: i.id },
              create: { doa_id: i.doa_id, order_number: i.order_number }
            }))
          }
        },
        include: {
          doas: { include: { doa: true } },
        },
        where: { id }
      })
      return compilation;
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to update compilation." }, { status: 500 });
    }
  },
  delete: async ({ id }: DeleteCompilationParams): Promise<DeleteCompilationResponse> => {
    try {
      await prisma.compilation.delete({
        where: { id },
      });
      return { id };
    } catch (error) {
      console.log({ error })
      return { id }
    }
  },
  get: async ({ id }: RetrieveCompilationParams): Promise<RetrieveCompilationResponse | null> => {
    try {
      const compilations = await prisma.compilation.findFirstOrThrow({
        where: { id },
        include: {
          doas: { include: { doa: true } },
        },
      });
      return compilations;
    } catch (error) {
      console.log({ error })
      return null
    }
  },
}
