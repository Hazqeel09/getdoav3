import { LoaderFunction } from "@remix-run/node";
import doaData from "../data/doa.json"; // Import JSON data

export const loader: LoaderFunction = () => {
  const baseUrl = "https://getdoa.com";

  // Generate sitemap content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/all-doa</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- Dynamic Pages -->
  ${doaData
    .map(
      (doa) => `
  <url>
    <loc>${baseUrl}/doa/${doa.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  // Trim any unexpected spaces or newlines before returning the response
  return new Response(sitemap.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
