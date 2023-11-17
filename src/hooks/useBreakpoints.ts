import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

export default function useBreakpoints() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  return { xs, sm, md, lg };
}
