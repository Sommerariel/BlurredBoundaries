import type { LinksFunction } from "@remix-run/node"; 
import { Link } from "@remix-run/react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';


import FacebookIcon from '@mui/icons-material/Facebook';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import PolicyIcon from '@mui/icons-material/Policy';
import PhotoIcon from '@mui/icons-material/Photo';

// import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}
  ];
};

const drawerWidth = 240;

export default function Index() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer 
        variant="permanent"
        anchor="left" 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box>
          Blurred Boundaries
        </Box>
        <Divider />
        <List>
          <ListItem key="facebook">
            <ListItemButton>
              <ListItemIcon>
                  <FacebookIcon />
              </ListItemIcon>
              <Link to="facebook">Facebook</Link> 
            </ListItemButton>
          </ListItem>
          <ListItem key="instagram">
            <ListItemButton>
              <ListItemIcon>
                  <InstagramIcon />
              </ListItemIcon>
              <Link to="instagram">Instagram</Link>
            </ListItemButton>
          </ListItem>
          <ListItem  key="google">
            <ListItemButton>
              <ListItemIcon>
                  <GoogleIcon />
              </ListItemIcon>
              <Link to="google">Google</Link>
            </ListItemButton>
          </ListItem>
          <ListItem  key="image">
            <ListItemButton>
              <ListItemIcon>
                  <PhotoIcon />
              </ListItemIcon>
              <Link to="image">Image Info</Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  key="privacy">
            <ListItemButton>
              <ListItemIcon>
                  <PolicyIcon />
              </ListItemIcon>
              <Link to="privacy">Privacy Policy</Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Typography variant="h1">Blurred Boundaries: Your Public Information Guide</Typography>       
        <Typography paragraph></Typography>
      </Box>
    </Box>
  );
}
