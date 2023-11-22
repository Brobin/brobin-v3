import { Article } from "@brobin/types/blog";
import { getArticles } from "@brobin/utils/blog";
import { getRecipeSlugs } from "@brobin/utils/cookbook";
import { getYears } from "@brobin/utils/fishing";
import { getAlbums } from "@brobin/utils/flickr";
import dayjs from "dayjs";
import { NextApiResponse } from "next";

const BASE_URL = "https://brobin.me";

type SitemapItem = {
  url: string;
  lastMod?: string;
};

export default function Sitemap() {}

function generateSitemap(items: SitemapItem[]) {
  const xmlItems = items.map(
    (item) => `
    <url>
      <loc>${`${BASE_URL}${item.url}`}</loc>${
      item.lastMod
        ? `
      <lastMod>${item.lastMod}</lastMod>`
        : ""
    }
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
  const articles = await getArticles().map(({ link, date }) => ({
    url: link,
    lastMod: dayjs(date).format("YYYY-MM-DD"),
  }));

  const years = await getYears().map((year) => ({ url: `/fishing/${year}` }));

  const recipes = await getRecipeSlugs().map((slug) => ({
    url: `/cookbook/${slug}`,
  }));

  const albums = (await getAlbums()).map((album) => ({
    url: `/photos/album/${album.id}`,
    lastMod: album.updated,
  }));

  const latestAlbumUpdate = albums.sort((a, b) =>
    Date.parse(b.lastMod) > Date.parse(a.lastMod) ? 1 : -1
  )[0].lastMod;

  const sitemap = generateSitemap([
    { url: "", lastMod: "2023-11-22" },
    { url: "/blog", lastMod: "2023-11-22" },
    ...articles,
    { url: "/fishing", lastMod: "2023-11-22" },
    ...years,
    { url: "/cookbook", lastMod: "2023-11-22" },
    ...recipes,
    { url: "/photos", lastMod: latestAlbumUpdate },
    ...albums,
  ]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
