import { AccountBox, Article, Group, Home, ModeNight, Person, Settings, Storefront } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
const listItem = [
  {
    component: 'a',
    href: '#home',
    text: 'Homepage',
    icon: <Home />
  },
  {
    component: 'a',
    href: '#home',
    text: 'Friends',
    icon: <Person />
  },
  {
    component: 'a',
    href: '#home',
    text: 'Settings',
    icon: <Settings />
  },
  {
    component: 'a',
    href: '/profile',
    text: 'Profile',
    icon: <AccountBox />
  },
  {
    component: 'a',
    href: '/chat',
    text: 'Messages',
    icon: <MessageIcon />
  }
];

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position='fixed'>
        <List>
          {listItem.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton component={Link} to={item.href} style={{ textDecoration: 'none', color: '#000' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton component='a' href='#simple-list'>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
