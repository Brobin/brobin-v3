import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
  experimental_extendTheme,
} from "@mui/material/styles";
import { AppProps } from "next/app";

const materialTheme = experimental_extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "#181818",
        },
      },
    },
  },
});

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <Experimental_CssVarsProvider
      defaultMode="dark"
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
    >
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </Experimental_CssVarsProvider>
  );
}
