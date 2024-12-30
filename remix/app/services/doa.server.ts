import { CreateDoaRequest, CreateDoaResponse, DeleteDoaParams, DeleteDoaResponse, ListDoasParams, ListDoasResponse, RetrieveDoaParams, RetrieveDoaResponse, UpdateDoaRequest, UpdateDoaResponse } from "~/types/doas";
import prisma from "~/libs/prisma.server";
import { errorResponseType } from "~/constants/errors";

export const doaService = {
  list: async ({ categories, sources, limit, page }: ListDoasParams): Promise<ListDoasResponse | errorResponseType> => {
    try {
      const [data, total] = await Promise.all([
        await prisma.doa.findMany({
          take: limit,
          skip: (page * limit) - limit,
          orderBy: { created_at: 'desc' },
          include: {
            categories: { include: { category: true }, where: { category: { name: { in: categories?.length ? categories : undefined } } } },
            sources: { include: { source: true }, where: { source: { name: { in: sources?.length ? categories : undefined } } } }
          }
        }),
        await prisma.doa.count()
      ])
      return { data, total };
    } catch (error) {
      return Response.json({ error: "Unable to fetch doa list." }, { status: 500 });
    }
  },
  create: async ({
    title_my,
    title_en,
    text_ar,
    text_my,
    text_en,
    fadhilat_amal_my,
    fadhilat_amal_en,
    slug,
    is_verified,
    is_public,
    user_id,
    // TODO: Implement categories and sources
    // categories,
    // sources,
  }: CreateDoaRequest): Promise<CreateDoaResponse | errorResponseType> => {
    try {
      const doa = await prisma.doa.create({
        data: {
          title_my,
          title_en,
          text_ar,
          text_my,
          text_en,
          fadhilat_amal_my,
          fadhilat_amal_en,
          slug,
          is_verified,
          is_public,
          user_id,
        },
        include: {
          categories: { include: { category: true } },
          sources: { include: { source: true } }
        }
      })
      return doa;
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to create doa." }, { status: 500 });
    }
  },
  update: async ({
    id,
    title_my,
    title_en,
    text_ar,
    text_my,
    text_en,
    fadhilat_amal_my,
    fadhilat_amal_en,
    slug,
    is_verified,
    is_public,
    // TODO: Implement categories and sources
    // categories,
    // sources,
  }: UpdateDoaRequest): Promise<UpdateDoaResponse | errorResponseType> => {
    try {
      const doa = await prisma.doa.update({
        data: {
          title_my,
          title_en,
          text_ar,
          text_my,
          text_en,
          fadhilat_amal_my,
          fadhilat_amal_en,
          slug,
          is_verified,
          is_public,
        },
        include: {
          categories: { include: { category: true } },
          sources: { include: { source: true } }
        },
        where: { id }
      })
      return doa;
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to update doa." }, { status: 500 });
    }
  },
  delete: async ({ id }: DeleteDoaParams): Promise<DeleteDoaResponse> => {
    try {
      await prisma.doa.delete({
        where: { id },
      });
      return { id };
    } catch (error) {
      console.log({ error })
      return { id }
    }
  },
  get: async ({ id }: RetrieveDoaParams): Promise<RetrieveDoaResponse | null> => {
    try {
      const doas = await prisma.doa.findFirstOrThrow({
        where: { id },
        include: {
          categories: { include: { category: true } },
          sources: { include: { source: true } }
        },
      });
      return doas;
    } catch (error) {
      console.log({ error })
      return null
    }
  },
}
