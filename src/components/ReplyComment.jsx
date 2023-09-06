import {
  Avatar,
  Box,
  IconButton,
  MenuList,
  MenuItem,
  Typography,
  Paper,
  ClickAwayListener,
  Grow,
  Popper,
  Divider
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const ReplyComment = ({ postUser, reply, key, handleDelete }) => {
  // #region get user profile
  const { profile } = useContext(UserContext);
  //#endregion
  // #region click to open menu delete or ...
  const [anchorElForClick, setAnchorElForClick] = useState(null);
  const handleClickAnchorEl = (event) => {
    setAnchorElForClick(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElForClick(null);
  };
  //#endregion
  // #region delete Reply
  const handleDeleteReply = async () => {
    handleDelete(reply.id);
    handleClose();
  };
  // #endregion
  return (
    <Box key={`${reply.id}${key}`} sx={{ marginTop: '30px', display: 'flex', alignItems: 'center' }}>
      <Link to='/profile' style={{ marginRight: '10px' }}>
        <Avatar src={reply.user.avatar} alt={reply.user.displayName} />
      </Link>
      <Typography variant='body2' sx={{ marginLeft: 2 }}>
        <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
          <Typography style={{ fontWeight: 700, fontSize: '14px' }}>
            {reply.user.displayName}: <span style={{ fontWeight: 'normal' }}></span>
          </Typography>
        </Link>
        <Typography>{reply.content}</Typography>
      </Typography>
      {(profile?.id === reply.user.id || // Ng viết comment
        profile?.role?.name === 'ROLE_ADMIN' || // ADMIN
        postUser.id === profile?.id) && ( // Chủ bài
        <Box sx={{ marginLeft: 'auto' }}>
          <IconButton aria-controls='dropdown-menu' onClick={handleClickAnchorEl}>
            <MoreVertIcon icon='morevert' />
          </IconButton>
          <Popper sx={{ zIndex: 10 }} open={open} anchorEl={anchorElForClick} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id='dropdown-menu'
                      anchorEl={anchorElForClick}
                      open={Boolean(anchorElForClick)}
                      onClose={handleClose}
                    >
                      <>
                        <MenuItem onClick={handleClose} sx={{ paddingY: 0 }}>
                          Edit
                        </MenuItem>
                        <Divider sx={{ marginX: 0 }} />
                        <MenuItem onClick={handleDeleteReply} sx={{ paddingY: 0 }}>
                          Delete
                        </MenuItem>
                      </>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      )}
    </Box>
  );
};

export default ReplyComment;
