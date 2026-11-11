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

const links = [
  { href: "/birds-of-nebraska", label: "Birds of Nebraska" },
  { href: "/big-year", label: "Big Year" },
  { href: "/photos", label: "Photography" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

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
              Tobin
            </ListItemButton>
          </ListItem>

          {xs ? (
            <ListItem sx={{ marginInlineStart: "auto", paddingRight: 0 }}>
              <Button
                variant="plain"
                color="neutral"
                size="lg"
                onClick={() => setOpen(true)}
                sx={{ paddingY: 0, paddingX: 1 }}
              >
                <MenuSharp sx={{ fontSize: 40 }} />
              </Button>
            </ListItem>
          ) : (
            <>
              {links.map((link, i) => (
                <React.Fragment key={link.href}>
                  {i > 0 && <ListDivider />}
                  <ListItem
                    sx={{
                      ...(i === 0 && { marginInlineStart: "auto" }),
                      ...(i === links.length - 1 && { paddingRight: 0 }),
                    }}
                  >
                    <ListItemButton component="a" href={link.href}>
                      {link.label}
                    </ListItemButton>
                  </ListItem>
                </React.Fragment>
              ))}
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
            {links.map((link) => (
              <ListItem key={link.href}>
                <ListItemButton component="a" href={link.href}>
                  {link.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
    </Sheet>
  );
}
