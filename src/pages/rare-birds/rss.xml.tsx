import { Observation } from "@brobin/types/ebird";
import { getRareBirds } from "@brobin/utils/ebird";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { NextApiResponse } from "next";
import RSS from "rss";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

export default function RareBirds() {}

function generateRssFeed(observations: Observation[]) {
  const feed = new RSS({
    title: "Nebraska Rare Birds",
    description: "RSS feed of rare bird sightings in Nebraska",
    site_url: "https://brobin.me/rare-birds/rss.xml",
    feed_url: "https://brobin.me/rare-birds/rss.xml",
    pubDate: new Date(),
  });

  observations.forEach((obs) => {
    feed.item({
      title: `${obs.comName} in ${obs.subnational2Name} county`,
      description: obs.locName,
      url: `https://ebird.org/checklist/${obs.subId}`,
      date: dayjs(obs.obsDt).tz("America/Chicago", true).toDate(),
    });
  });

  return feed.xml({ indent: true });
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const observations = await getRareBirds();

  const rss = generateRssFeed(observations);

  res.setHeader("Content-Type", "application/rss+xml");
  res.write(rss);
  res.end();

  return { props: {} };
}
