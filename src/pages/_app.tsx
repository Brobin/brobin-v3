import Footer from "@brobin/components/Footer";
import Header from "@brobin/components/Header";
import { Container } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
  experimental_extendTheme,
} from "@mui/material/styles";
import { Metadata } from "next";
import { AppProps } from "next/app";

const materialTheme = experimental_extendTheme();

export const metadata: Metadata = {
  title: {
    default: "Tobin Brown | Brobin",
    template: "%x | Brobin",
  },
};

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <Experimental_CssVarsProvider
      defaultMode="system"
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
    >
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </CssVarsProvider>
    </Experimental_CssVarsProvider>
  );
}
