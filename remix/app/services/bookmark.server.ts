import { ListCompilationsResponse } from "~/types/compilations";
import prisma from "~/libs/prisma.server";
import { errorResponseType } from "~/constants/errors";
import { ListDoasResponse } from "~/types/doas";
import { AddBookmarkRequest, AddBookmarkResponse, ListBookmarkedCompilationsParams, ListBookmarkedDoasParams, RemoveBookmarkRequest, RemoveBookmarkResponse } from "~/types/bookmarks";

export const bookmarkService = {
  listDoas: async ({ categories, sources, limit, page, user_id }: ListBookmarkedDoasParams): Promise<ListDoasResponse | errorResponseType> => {
    try {
      const [data, total] = await Promise.all([
        await prisma.doa.findMany({
          take: limit,
          skip: (page * limit) - limit,
          orderBy: { created_at: 'desc' },
          include: {
            categories: { include: { category: true }, where: { category: { name: { in: categories?.length ? categories : undefined } } } },
            sources: { include: { source: true }, where: { source: { name: { in: sources?.length ? categories : undefined } } } }
          },
          where: {
            bookmarks: { some: { user_id } },
          }
        }),
        await prisma.doa.count()
      ])
      return { data, total };
    } catch (error) {
      return Response.json({ error: "Unable to fetch bookmarked doa list." }, { status: 500 });
    }
  },
  listCompilations: async ({ limit, page, user_id }: ListBookmarkedCompilationsParams): Promise<ListCompilationsResponse | errorResponseType> => {
    try {
      const [data, total] = await Promise.all([
        await prisma.compilation.findMany({
          take: limit,
          skip: (page * limit) - limit,
          orderBy: { created_at: 'desc' },
          include: {
            doas: { include: { doa: true } },
          },
          where: {
            bookmarks: { some: { user_id: user_id } }
          }
        }),
        await prisma.compilation.count()
      ])
      return { data, total };
    } catch (error) {
      return Response.json({ error: "Unable to fetch bookmarked compilation list." }, { status: 500 });
    }
  },
  add: async ({
    user_id,
    doa_id,
    compilation_id,
  }: AddBookmarkRequest): Promise<AddBookmarkResponse | errorResponseType> => {
    try {
      const bookmark = await prisma.bookmark.create({
        data: {
          user_id,
          doa_id,
          compilation_id,
        },
        include: {
          doa: {
            include: {
              categories: { include: { category: true } },
              sources: { include: { source: true } }
            }
          },
          compilation: {
            include: {
              doas: { include: { doa: true } },
            }
          },
        }
      })
      if (bookmark.doa) {
        return bookmark.doa
      } else if (bookmark.compilation) {
        return bookmark.compilation
      }
      throw new Error("missing doa or compilation in response")
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to add bookmark." }, { status: 500 });
    }
  },
  remove: async ({
    id,
    user_id,
  }: RemoveBookmarkRequest): Promise<RemoveBookmarkResponse | errorResponseType> => {
    try {
      await prisma.bookmark.delete({
        where: { id, user_id },
      })
      return { id }
    } catch (error) {
      console.log({ error })
      return Response.json({ error: "Unable to remove bookmark." }, { status: 500 });
    }
  },
}
