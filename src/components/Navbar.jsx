import { AccountBox, Mail, Notifications, Pets } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Grow,
  InputBase,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
  styled
} from '@mui/material';
import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/surface_logo.png';
import UserContext from '../context/UserContext';
import { clearLS } from '../utils/auth';

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
  const navigate = useNavigate();
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
  const { profile, setUser } = useContext(UserContext);
  // #endregion
  return (
    <AppBar sx={{ position: 'sticky', top: 0, left: 0, right: 0, width: '100%', height: '64px' }}>
      <StyledToolbar>
        <Box
          sx={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        >
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
          {/* <Badge badgeContent={4} color='error'>
            <Mail cursor='pointer' />
          </Badge>
          <Badge badgeContent={2} color='error'>
            <Notifications cursor='pointer' />
          </Badge> */}
          <Avatar sx={{ width: 30, height: 30, cursor: 'pointer' }} src={profile.avatar} onClick={handleAvatarClick} />
        </Icons>
        <UserBox onClick={handleAvatarClick}>
          <Avatar sx={{ width: 30, height: 30 }} src={profile.avatar} />
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
                  <Link to={'/profile'}>
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <AccountBox fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary='Profile' />
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='My account' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      clearLS();
                      navigate('/login');
                    }}
                  >
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
