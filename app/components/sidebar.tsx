import { Link } from "@remix-run/react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import PolicyIcon from '@mui/icons-material/Policy';
import PhotoIcon from '@mui/icons-material/Photo';

const drawerWidth = 240;

export default function Sidebar() {
    return (
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
    );
}