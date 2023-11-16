import { Container } from "@mui/joy";
import Head from "next/head";

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function Page({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title} | Brobin</title>
      </Head>
      <Container>{children}</Container>
    </>
  );
}
