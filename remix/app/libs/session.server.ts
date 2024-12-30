import { createCookie } from "@remix-run/node";

export const sessionCookie = createCookie('__session', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secrets: [process.env.SESSION_SECRET!],
  secure: process.env.NODE_ENV === 'production'
});

export const isValidSession = async (request: Request) => {
  const cookie = await sessionCookie.parse(request.headers.get('Cookie'));
  if (!cookie || !cookie?.session?.id) {
    return null
  }
  return cookie.session
}
