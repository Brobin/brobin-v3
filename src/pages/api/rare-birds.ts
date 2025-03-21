import { getRareBirds } from "@brobin/utils/ebird";
import dayjs from "dayjs";
import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { NextApiRequest, NextApiResponse } from "next";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { neon, NeonQueryPromise } from "@neondatabase/serverless";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function getAlreadyInsertedObsIds() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql("SELECT obsid from rare_birds;");
  return result.map((result) => result["obsid"]);
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  await client.login(process.env.DISCORD_TOKEN);
  const channel = await client.channels.fetch(
    process.env.DISCORD_CHANNEL_ID as string
  );

  const observations = await getRareBirds();

  if (channel && channel.isSendable()) {
    const alreadyInserted = await getAlreadyInsertedObsIds();

    const sql = neon(`${process.env.DATABASE_URL}`);
    const queries: NeonQueryPromise<false, false, Record<string, any>[]>[] = [];

    observations
      .filter((obs) => !alreadyInserted.includes(obs.obsId))
      .forEach(async (obs) => {
        const location = obs.locationPrivate
          ? `${obs.locName} (Personal Location)`
          : obs.locName;
        const message = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(obs.comName)
          .setURL(`https://ebird.org/checklist/${obs.subId}`)
          .setTimestamp(dayjs(obs.obsDt).tz("America/Chicago", true).toDate())
          .addFields({
            value: location,
            name: `${obs.subnational2Name} County`,
          })
          .setFooter({ text: obs.userDisplayName });

        channel.send({ embeds: [message] });
        queries.push(
          sql`INSERT INTO rare_birds (obsid) VALUES (${obs.obsId});`
        );
      });

    await sql.transaction(queries);
  }

  res.status(200).json(observations);
}
