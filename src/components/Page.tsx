import { Container } from "@mui/joy";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function Page({ title, children }: Props) {
  const pageTitle = `${title} | Brobin`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
