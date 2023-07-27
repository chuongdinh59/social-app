import { Mail, Notifications, Pets } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  MenuList,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React, { useRef } from 'react';
import logo from '../assets/surface_logo.png';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
  cursor: 'pointer'
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex'
  }
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}));

const Navbar = () => {
  // #region Search
  const searchString = useRef();
  // #endregion

  // #region Avatar Menu Click
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  // #endregion

  // #region User ?
  // #endregion
  return (
    <AppBar sx={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%' }}>
      <StyledToolbar>
        <Box display='flex'>
          <Avatar src={logo} />
          <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
            Surface
          </Typography>
        </Box>
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Search>
          <InputBase placeholder='Search...' />
        </Search>
        <Icons>
          <Badge badgeContent={4} color='error'>
            <Mail cursor='pointer' />
          </Badge>
          <Badge badgeContent={2} color='error'>
            <Notifications cursor='pointer' />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30, cursor: 'pointer' }}
            src='https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            onClick={handleAvatarClick}
          />
        </Icons>
        <UserBox onClick={handleAvatarClick}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src='https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          />
          <Typography variant='span'>John</Typography>
        </UserBox>
      </StyledToolbar>
      <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleAvatarClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Profile' />
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='My account' />
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </AppBar>
  );
};

export default Navbar;
