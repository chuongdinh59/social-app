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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../context/UserContext';
import { FacebookSelector } from '@charkour/react-reactions';
import { dateFormatFromString } from '../utils/dateFormat';
import actionService from '../apis/actionService';
import { isEmptyObject } from '../utils/utils';

const ReplyComment = ({ postUser, reply, key, handleDelete }) => {
  // #region get user profile
  const { profile } = useContext(UserContext);
  const navigate = useNavigate();

  //#endregion
  // #region action handlers
  const [actionOnReply, setActionOnReply] = useState(reply?.currentAction?.toLowerCase());
  const [showIcon, setShowIcon] = useState(false);
  const handleReactOnReply = (key) => {
    setActionOnReply(key);
    setShowIcon(false);
  };
  const handleToggleAction = async (event) => {
    setActionOnReply((prev) => (prev ? null : 'like'));
  };
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const saveOrUpdateOrDelete = async () => {
      const formData = new FormData();
      formData.append('subComment', reply.id);
      // case when add new -> up like
      if (actionOnReply) formData.append('action', actionOnReply?.toUpperCase());
      if (formData.get('subComment') || formData.get('action')) {
        const data = await actionService.actionOnReply(formData);
      }
    };
    if (!isEmptyObject(profile)) {
      saveOrUpdateOrDelete();
    } else {
      navigate('/login');
    }
  }, [actionOnReply]);
  // #region click to open menu delete or ...
  const [anchorElForClick, setAnchorElForClick] = useState(null);
  const open = Boolean(anchorElForClick);
  const handleClickOpenPopper = (event) => {
    setAnchorElForClick(event.currentTarget);
  };
  const handleClosePopper = () => {
    setAnchorElForClick(null);
  };
  //#endregion
  // #region delete Reply
  const handleDeleteReply = async () => {
    handleDelete(reply.id);
    handleClosePopper();
  };
  // #endregion
  return (
    <Box key={`${reply.id}${key}`} sx={{ marginTop: '30px', display: 'flex', alignItems: 'center' }}>
      <Link to={`/?userId=${reply.user.id}`} style={{ marginRight: '10px' }}>
        <Avatar src={reply.user.avatar} alt={reply.user.displayName} />
      </Link>
      <Box sx={{ position: 'relative', minWidth: '75%' }}>
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '8px', display: 'flex', borderRadius: '5px', width: '100%' }}>
          <Typography variant='body2' sx={{ marginLeft: 2 }}>
            <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
              <Typography style={{ fontWeight: 700, fontSize: '14px' }}>
                {reply.user.displayName}: <span style={{ fontWeight: 'normal' }}></span>
              </Typography>
            </Link>
            <Typography>{reply.content}</Typography>
          </Typography>
          {(profile?.id === reply.user.id || // Ng viết reply
            profile?.role?.name === 'ROLE_ADMIN' || // ADMIN
            postUser.id === profile?.id) && ( // Chủ bài
            <Box sx={{ marginLeft: 'auto' }}>
              <IconButton aria-controls='dropdown-menu' onClick={handleClickOpenPopper}>
                <MoreVertIcon icon='morevert' />
              </IconButton>
              <Popper sx={{ zIndex: 10 }} open={open} anchorEl={anchorElForClick} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClosePopper}>
                        <MenuList
                          autoFocusItem={open}
                          id='dropdown-menu'
                          anchorEl={anchorElForClick}
                          open={Boolean(anchorElForClick)}
                          onClose={handleClosePopper}
                        >
                          <MenuItem onClick={handleClosePopper} sx={{ paddingY: 0 }}>
                            Edit
                          </MenuItem>
                          <Divider sx={{ marginX: 0 }} />
                          <MenuItem onClick={handleDeleteReply} sx={{ paddingY: 0 }}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          )}
        </Box>
        <Box>
          <Box
            sx={{ position: 'absolute', top: '60%', left: '50%', zIndex: 10 }}
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
          >
            <Box
              sx={{ marginLeft: '10px', marginRight: '70%', display: 'flex', position: 'relative' }}
              onClick={handleToggleAction}
            >
              <Box sx={{ display: 'flex', backgroundColor: '#feffff', padding: 0, borderRadius: '5px' }}>
                {actionOnReply ? (
                  <FacebookSelector reactions={[actionOnReply.toLowerCase()]} iconSize={12} />
                ) : (
                  <>
                    <Typography>{reply?.countAction || 0}</Typography>
                    <ThumbUpOffAltIcon />
                  </>
                )}
              </Box>
            </Box>
            <>
              {showIcon && (
                <Box sx={{ position: 'absolute', top: '-110%', zIndex: 100 }}>
                  <FacebookSelector variant='facebook' iconSize={20} onSelect={handleReactOnReply} />
                </Box>
              )}
            </>
          </Box>
          {dateFormatFromString(reply.createdDate)}
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyComment;
