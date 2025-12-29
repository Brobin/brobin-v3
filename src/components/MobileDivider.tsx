import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Divider } from "@mui/joy";

export default function MobileDivider() {
  const { xs, sm } = useBreakpoints();
  return xs || sm ? <Divider sx={{ marginY: 2 }} /> : <></>;
}
