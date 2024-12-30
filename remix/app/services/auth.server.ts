import { User } from "~/types/users";
import prisma from "../libs/prisma.server";

export const authService = {
  getUser: async (request: Request): Promise<User | null> => {
    const authHeader = request.headers.get('Authorization')
    const token = extractBearerToken(authHeader)

    if (!token) {
      return null
    }

    try {
      const session = await prisma.session.findFirstOrThrow({
        where: {
          id: token,
          expires_at: { gte: new Date() },
        },
        include: { user: {select: { id: true, email: true, username: true }} },
      })
      return session.user
    } catch {
      return null
    }

    function extractBearerToken(authHeader: string | null): string | null {
      if (!authHeader?.startsWith('Bearer ')) {
        return null
      }
      return authHeader.slice(7)
    }

  },
}
