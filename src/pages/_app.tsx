import Footer from "@brobin/components/Footer";
import Header from "@brobin/components/Header";
import { Container, CssBaseline, CssVarsProvider } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Metadata } from "next";
import { AppProps } from "next/app";

const joyTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "var(--joy-palette-neutral-900)",
          surface: "var(--joy-palette-neutral-800)",
        },
      },
    },
  },
});

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "var(--joy-palette-neutral-900)",
      paper: "var(--joy-palette-neutral-800)",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {
          background: "var(--joy-palette-neutral-900)",
        },
      },
    },
  },
});

export const metadata: Metadata = {
  title: {
    default: "Tobin Brown | Brobin",
    template: "%x | Brobin",
  },
};

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssVarsProvider theme={joyTheme} defaultMode="dark">
        <CssBaseline />
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </CssVarsProvider>
    </ThemeProvider>
  );
}
