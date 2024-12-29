import prisma from "../libs/prisma.server";

export const authService = {
  isAuthenticated: async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = extractBearerToken(authHeader)

    if (!token) {
      return null
    }

    try {
      const session = await prisma.session.findFirstOrThrow({
        where: {
          id: token
        },
      })
      if (session.expires_at < new Date()) {
        await prisma.session.delete({
          where: { id: token }
        })
        return null
      }
      return await prisma.user.findFirstOrThrow({
        where: { id: session.user_id }
      })
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
