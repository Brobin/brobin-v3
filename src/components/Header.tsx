import {
  Avatar,
  Container,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Sheet,
} from "@mui/joy";

export default function Header() {
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
        </List>
      </Container>
    </Sheet>
  );
}
