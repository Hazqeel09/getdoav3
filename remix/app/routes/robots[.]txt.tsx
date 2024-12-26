import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const robots = `
    User-agent: *
    Allow: /
    Disallow: /private/

    Sitemap: https://getdoa.com/sitemap.xml
  `;

  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
