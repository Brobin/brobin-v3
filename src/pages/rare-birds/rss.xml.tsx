import { Observation } from "@brobin/types/ebird";
import { getRareBirds } from "@brobin/utils/ebird";
import dayjs from "dayjs";
import { NextApiResponse } from "next";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

export default function RareBirds() {}

function generateRssFeed(observations: Observation[]) {
  const items = observations.map(
    (obs) =>
      `<item>
        <title>${obs.comName} in ${obs.subnational2Name} county</title>
        <link>https://ebird.org/checklist/${obs.subId}</link>
        <description>${obs.locName}</description>
        <pubDate>${dayjs(obs.obsDt).tz("America/Chicago", true)}</pubDate>
        <guid>https://ebird.org/checklist/${obs.subId}?obs=${obs.obsId}</guid>
      </item>`
  );

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
          <title>Nebraska Rare Birds</title>
          <link>https://ebird.org/alert/summary?sid=SN35682</link>
          <description>A RSS feed containing rare bird sightings in Nebraska</description>
          <language>en-us</language>
          <pubDate>${dayjs().tz("America/Chicago")}</pubDate>
          <atom:link rel="self" href="https://brobin.me/rare-birds.xml" />
          ${items.join("")}
      </channel>
    </rss>`;
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const observations = await getRareBirds();

  const rss = generateRssFeed(observations);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: {} };
}
