import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { isValidSession } from "./libs/session.server";
import { Prisma } from "@prisma/client";
import { CurrentUserContext } from "./contexts/current-user";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const validSession = await isValidSession(request)

  return Response.json(validSession?.user || null)
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<Prisma.UserSelect | null>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overscroll-none">
        <CurrentUserContext.Provider value={loaderData || null}>
          {children}
        </CurrentUserContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <script
          async
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "49dd87abb5b3407c938f56279d27b80e"}'
        ></script>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
