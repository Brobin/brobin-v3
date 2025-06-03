import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Drawer,
  IconButton,
  LinearProgress,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import BirdList from "./BirdList";
import useMapContext from "./MapContext";

export default function MapDrawer() {
  const [open, setOpen] = React.useState(false);
  const { search, setSearch, loading } = useMapContext();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nebraska Big Year Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "8px",
          }}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <TextField
          id="search"
          label="Search"
          variant="filled"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? <LinearProgress sx={{ my: 4, mx: 2 }} /> : <BirdList />}
      </Drawer>
    </>
  );
}
