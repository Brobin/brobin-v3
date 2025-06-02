import { Drawer } from "@mui/joy";
import React from "react";

export default function MapDrawer() {
  const [open, setOpen] = React.useState<boolean>(false);

  return <Drawer open={open} onClose={() => setOpen(false)}></Drawer>;
}
