import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getTokenFromCode } from "../libs/oauth2.server";
import prisma from "~/libs/prisma.server";
import { sessionCookie } from "~/libs/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const code = searchParams.get("code");

  if (!code) {
    return redirect('/register')
  }

  const idToken = await getTokenFromCode(code)

  let user = await prisma.user.findFirst({
    where: {
      google_sub: idToken.sub
    }
  })

  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          email: idToken.email!,
          google_sub: idToken.sub,
          username: idToken.email!,
        }
      })
    } catch (error) {
      console.error(error)
      return redirect('/register')
    }
  }

  try {
    const session = await prisma.session.create({
      data: {
        user_id: user.id,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      },
      include: {
        user: {select: {id: true, email: true, username: true}}
      }
    })
    const headers = new Headers();
    headers.append('Set-Cookie', await sessionCookie.serialize({ session }));
    return redirect('/', { headers })
  } catch (error) {
    console.error(error)
    return redirect('/register')
  }
}
