import { getArticles } from "@brobin/utils/blog";
import { getRecipeSlugs } from "@brobin/utils/cookbook";
import { getYears } from "@brobin/utils/fishing";
import { getAlbums } from "@brobin/utils/photos";
import { NextApiResponse } from "next";

const BASE_URL = "https://brobin.me";

export default function Sitemap() {}

function generateSitemap(urls: string[]) {
  const xmlItems = urls.map(
    (url) => `
    <url>
      <loc>${`${BASE_URL}${url}`}</loc>
    </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems.join(
    ""
  )}
  </urlset>
   `;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const articles = await getArticles().map(({ link }) => link);

  const years = await getYears().map((year) => `/fishing/${year}`);

  const recipes = await getRecipeSlugs().map((slug) => `/cookbook/${slug}`);

  const albums = getAlbums().map((album) => `/photos/${album.slug}`);

  const sitemap = generateSitemap([
    "",
    "/blog",
    ...articles,
    "/fishing",
    ...years,
    "/cookbook",
    ...recipes,
    "/photos",
    ...albums,
  ]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
