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
  const pageTitle = `${title} • Tobin`;
  const metaDescription = description || title;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={title} />
        <meta name="description" content={metaDescription} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />

        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={metaDescription} />

        {image && (
          <>
            <meta property="og:image" content={image.source} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="twitter:image" content={image.source} />
            <meta property="twitter:card" content="summary_large_image" />
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
