import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const styles = {
  nonLinkText: {
    textDecoration: 'none', // Remove underline
    color: 'black', // Change the color
  },
};

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText 
           primary={<Link to="/dashboard" style={styles.nonLinkText}>Dashboard</Link>}
           />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Link to="/stock" style={styles.nonLinkText}>Stock</Link>}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
