import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Divider } from "@mui/joy";

export default function MobileDivider() {
  const { xs, sm } = useBreakpoints();
  return (
    <Divider
      sx={{
        display: xs || sm ? "block" : "none",
        marginY: 2,
      }}
    />
  );
}
