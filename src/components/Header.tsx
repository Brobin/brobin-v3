import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Close, MenuSharp } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  Drawer,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Sheet,
} from "@mui/joy";
import React from "react";

export default function Header() {
  const { xs } = useBreakpoints();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet sx={{ marginBottom: 4, paddingY: 2 }}>
      <Container>
        <List role="menubar" orientation="horizontal">
          <ListItem sx={{ paddingLeft: 0 }}>
            <Avatar src="/images/profile.png" />
          </ListItem>
          <ListDivider />
          <ListItem>
            <ListItemButton component="a" href="/">
              Brobin
            </ListItemButton>
          </ListItem>

          {xs ? (
            <ListItem sx={{ marginInlineStart: "auto" }}>
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
              >
                <MenuSharp />
              </Button>
            </ListItem>
          ) : (
            <>
              <ListItem sx={{ marginInlineStart: "auto" }}>
                <ListItemButton component="a" href="/photos">
                  Photos
                </ListItemButton>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemButton component="a" href="/projects">
                  Projects
                </ListItemButton>
              </ListItem>
              <ListDivider />
              <ListItem sx={{ paddingRight: 0 }}>
                <ListItemButton component="a" href="/blog">
                  Blog
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>

        <Drawer
          size="sm"
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={() => setOpen(false)}>
                <Close />
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem>
              <ListItemButton component="a" href="/">
                Home
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/photos">
                Photos
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/projects">
                Projects
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ paddingRight: 0 }}>
              <ListItemButton component="a" href="/blog">
                Blog
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Container>
    </Sheet>
  );
}
