import { PhotoSize } from "@brobin/types/flickr";
import { Container } from "@mui/joy";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  title: string;
  description?: string;
  image?: Partial<PhotoSize>;
  children: JSX.Element | JSX.Element[];
}

export default function Page({ title, description, image, children }: Props) {
  const pageTitle = `${title} • Brobin`;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || title} />
        <meta name="og:description" content={description || title} />
        <meta name="og:title" content={title} />
        {image?.source && (
          <>
            <meta property="og:image" content={image.source} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:src" content={image.source} />
          </>
        )}
        {image?.height && (
          <meta property="og:image:height" content={image.height.toString()} />
        )}
        {image?.width && (
          <meta property="og:image:width" content={image.width.toString()} />
        )}
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
