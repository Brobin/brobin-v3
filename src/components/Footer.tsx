import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/joy";
import dayjs from "dayjs";
import Image from "next/image";

interface IconLinkProps {
  link: string;
  icon: JSX.Element;
}

function IconLink({ link, icon }: IconLinkProps) {
  return (
    <Link href={link} target="_blank" padding={1} color="neutral" level="h3">
      {icon}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer>
      <Box textAlign="center" paddingY={3}>
        <Typography level="body-sm" paddingBottom={1}>
          &copy; Tobin Brown 2013-{dayjs().year()}
        </Typography>

        <IconLink
          link="https://www.instagram.com/tobins.camera/"
          icon={<Instagram fontSize="large" />}
        />
        <IconLink
          link="https://github.com/brobin/"
          icon={<GitHub fontSize="large" />}
        />
        <IconLink
          link="https://www.linkedin.com/pub/tobin-brown/91/393/720"
          icon={<LinkedIn fontSize="large" />}
        />
        <IconLink
          link="https://www.inaturalist.org/people/brobin"
          icon={
            <Image
              src="/images/logo/inaturalist.png"
              alt="iNaturalist logo"
              height="30"
              width="30"
              style={{ filter: "grayscale(100%)" }}
            />
          }
        />
        <IconLink
          link="https://ebird.org/profile/NDA1ODIzNg/US"
          icon={
            <Image
              src="/images/logo/ebird.png"
              alt="eBird logo"
              height="30"
              width="88"
              style={{ filter: "grayscale(100%)" }}
            />
          }
        />
      </Box>
    </footer>
  );
}
