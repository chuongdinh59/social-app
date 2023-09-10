import { Reply } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FacebookSelector } from '@charkour/react-reactions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuList,
  MenuItem,
  TextField,
  Typography,
  Paper,
  ClickAwayListener,
  Popper,
  Grow
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import commentService from '../apis/commentService';
import { getProfileFromLS } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ReplyComment from './ReplyComment';
import { dateFormatFromString } from '../utils/dateFormat';
import actionService from '../apis/actionService';
import { isEmptyObject } from '../utils/utils';
import { toast } from 'react-toastify';

const Comment = ({ postUser, comment, handleDelete, isLockComment }) => {
  // #region get user profile
  const { profile } = useContext(UserContext);
  // #endregion
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorElForClick, setAnchorElForClick] = useState(null);
  const open = Boolean(anchorElForClick);
  // #region action handlers
  const [actionOnComment, setActionOnComment] = useState(comment?.currentAction?.toLowerCase());
  const [showIcon, setShowIcon] = useState(false);
  const navigate = useNavigate();
  const handleReactOnComment = (key) => {
    setActionOnComment(key);
    setShowIcon(false);
  };
  const handleToggleAction = async (event) => {
    setActionOnComment((prev) => (prev ? null : 'like'));
  };
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const saveOrUpdateOrDelete = async () => {
      const formData = new FormData();
      formData.append('comment', comment.id);
      // case when add new -> up like
      if (actionOnComment) formData.append('action', actionOnComment.toUpperCase());
      const data = await actionService.actionOnComment(formData);
    };
    if (!isEmptyObject(profile)) {
      saveOrUpdateOrDelete();
    } else {
      navigate('/login');
    }
  }, [actionOnComment]);
  // #endregion
  // #region click to open menu delete or ...
  const handleClickAnchorEl = (event) => {
    setAnchorElForClick(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElForClick(null);
  };
  // #endregion
  // #region delete comment
  const handleDeleteComment = async () => {
    handleDelete(comment.id);
    handleClose();
  };
  // #endregion
  // #region Reply section
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };
  const handleAddReply = async () => {
    if (reply.trim() !== '') {
      const newReply = {
        user: getProfileFromLS(),
        content: reply
      };
      setReplies([...replies, newReply]);
      setReply('');
      await commentService.addReply({
        content: reply,
        comment: comment.id
      });
    } else {
      toast.warning('Chưa nhập bình luận');
    }
  };
  const handleGetMoreReplies = async () => {
    const replies = await commentService.getRepliesByCommentId(comment.id, page + 1);
    replies?.data?.data && setReplies((pre) => [...pre, ...replies.data.data]);
  };
  const handleShowReply = async (page) => {
    setShowReplies(true);
    const replies = await commentService.getRepliesByCommentId(comment.id, page);
    replies?.data && setReplies(replies.data.data);
    console.log(replies.data);
  };
  // #endregion
  // #region handle Reply delete ...
  const handleDeleteReply = async (id) => {
    setReplies((pre) => pre.filter((i) => i.id !== id));
    await commentService.deleteReply(id);
  };
  // #endregion
  return (
    <>
      <Box sx={{ marginTop: '10px', alignItems: 'center', display: 'flex' }}>
        <Link to={`/user/?userId=${comment.user.id}`} style={{ marginRight: '10px' }}>
          <Avatar src={comment.user.avatar} alt={comment.user.displayName} />
        </Link>
        <Box sx={{ position: 'relative', minWidth: '75%' }}>
          <Box sx={{ backgroundColor: '#f0f0f0', padding: '8px', display: 'flex', borderRadius: '5px', width: '100%' }}>
            <Typography variant='body2' sx={{ marginLeft: 2 }}>
              <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                <Typography style={{ fontWeight: 700, fontSize: '14px' }}>
                  {comment.user.displayName}: <span style={{ fontWeight: 'normal' }}></span>
                </Typography>
              </Link>
              <Typography>{comment.content}</Typography>
            </Typography>
            {(profile?.id === comment.user.id || // Ng viết comment
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
                            <MenuItem onClick={handleClose} sx={{ paddingY: 0 }}>
                              Edit
                            </MenuItem>
                            <Divider sx={{ marginX: 0 }} />
                            <MenuItem onClick={handleDeleteComment} sx={{ paddingY: 0 }}>
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
              sx={{ position: 'absolute', top: '60%', left: '80%', zIndex: 10 }}
              onMouseEnter={() => setShowIcon(true)}
              onMouseLeave={() => setShowIcon(false)}
            >
              <Box
                sx={{ marginLeft: '10px', marginRight: '70%', display: 'flex', position: 'relative' }}
                onClick={handleToggleAction}
              >
                <Box sx={{ display: 'flex', backgroundColor: '#feffff', padding: 0, borderRadius: '5px' }}>
                  {actionOnComment ? (
                    <FacebookSelector reactions={[actionOnComment.toLowerCase()]} iconSize={12} />
                  ) : (
                    <>
                      <Typography>{comment.countAction || 0}</Typography>
                      <FavoriteBorderIcon />
                    </>
                  )}
                </Box>
              </Box>
              <>
                {showIcon && (
                  <Box sx={{ position: 'absolute', top: '-110%', zIndex: 100 }}>
                    <FacebookSelector variant='facebook' iconSize={20} onSelect={handleReactOnComment} />
                  </Box>
                )}
              </>
            </Box>
            <Box>
              {dateFormatFromString(comment.createdDate)}
              <IconButton size='small' aria-label='reply' onClick={() => setShowReplies(!showReplies)}>
                <Reply />
              </IconButton>
              <IconButton size='small' aria-label='reply' onClick={() => handleShowReply(page)}>
                <MoreHorizIcon /> {comment.countReply > 0 ? ` Có ${comment.countReply} phản hồi.. ` : ''}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Typography variant='caption'>{replies.length}</Typography> */}
      {/* Reply section */}
      {showReplies && (
        <Box sx={{ width: '95%', marginLeft: '5%' }}>
          <Button onClick={() => handleGetMoreReplies()} variant='text'>
            Xem thêm bình luận
          </Button>
          {replies?.map((reply, index) => (
            <ReplyComment postUser={postUser} reply={reply} key={index} handleDelete={handleDeleteReply} />
          ))}
          {!isEmptyObject(profile) && !isLockComment && (
            <TextField
              sx={{ width: '95%' }}
              label='Reply'
              value={reply}
              onChange={handleReplyChange}
              variant='outlined'
              margin='dense'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleAddReply}>
                      <SendOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Comment;
