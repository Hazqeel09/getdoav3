import type {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';
import {redirect} from '@remix-run/node';
import { isValidSession, sessionCookie } from '~/libs/session.server';

export const loader = async ({request}: LoaderFunctionArgs) => {
  return await logout(request)
};

export const action = async ({request}: ActionFunctionArgs) => {
  return await logout(request)
};

const logout = async (request: Request) => {
    const validSession = await isValidSession(request)
    if (!validSession) {
      return Response.json('Unauthorized', {status: 401});
    }
    const headers = new Headers();
    headers.append('Set-Cookie', await sessionCookie.serialize('', {expires: new Date(0),}));
    return redirect('/register', {headers})
}
