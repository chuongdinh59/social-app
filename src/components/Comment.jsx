import { Reply, ThumbDown, ThumbUp } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FacebookCounter, FacebookSelector, FacebookSelectorEmoji, icons } from '@charkour/react-reactions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuList,
  TextField,
  Typography
} from '@mui/material';
import { Paper, ClickAwayListener, Popper, Grow } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import commentService from '../apis/commentService';
import { getProfileFromLS } from '../utils/auth';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
const Comment = ({ postUser, comment, handleDelete }) => {
  // #region get user profile
  const { profile, setUser } = useContext(UserContext);
  // #endregion
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorElForClick, setAnchorElForClick] = useState(null);
  const open = Boolean(anchorElForClick);
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
    console.log("111");
    handleDelete(comment.id);
    handleClose();
  };
  // #endregion
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
    }
  };
  const handleGetMoreReplies = async () => {
    const replies = await commentService.getRepliesByCommentId(comment.id, page + 1);
    replies?.data?.data && setReplies((pre) => [...pre, ...replies.data.data]);
    console.log(replies);
  };
  const handleDeleteReply = (id) => {
    setReplies((pre) => pre.filter((i) => i.id !== id));
  };
  const handleShowReply = async (page) => {
    setShowReplies(true);
    const replies = await commentService.getRepliesByCommentId(comment.id, page);
    replies?.data && setReplies(replies.data.data);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: '10px',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Link to='/profile' style={{ marginRight: '10px' }}>
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
                            <>
                              <MenuItem onClick={handleClose} sx={{ paddingY: 0 }}>
                                Edit
                              </MenuItem>
                              <Divider sx={{ marginX: 0 }} />
                              <MenuItem onClick={handleDeleteComment} sx={{ paddingY: 0 }}>
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
          <Box>
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                zIndex: 10
              }}
            >
              <FacebookSelector variant='facebook' iconSize={12} />
            </Box>
            {comment.createdDate}
            <IconButton size='small' aria-label='reply' onClick={() => setShowReplies(!showReplies)}>
              <Reply />
            </IconButton>
            <IconButton size='small' aria-label='reply' onClick={() => handleShowReply(page)}>
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* <Typography variant='caption'>{replies.length}</Typography> */}
      {/* Reply section */}
      {showReplies && (
        <Box
          sx={{
            width: '95%',
            marginLeft: '5%'
          }}
        >
          <Button onClick={() => handleGetMoreReplies()} variant='text'>
            Xem thêm bình luận
          </Button>
          {replies?.map((reply, index) => {
            return (
              <Box
                key={`${reply.id}${index}`}
                display='flex'
                alignItems='center'
                sx={{
                  marginTop: '30px'
                }}
              >
                <Avatar src={reply.user.avatar} alt={reply.user.displayName} />
                <Typography variant='body2' color='text.secondary' sx={{ marginLeft: 2 }}>
                  <strong
                    style={{
                      fontWeight: 700,
                      fontSize: '16px'
                    }}
                  >
                    {reply.user.displayName}
                  </strong>
                  : {reply.content}
                </Typography>
                <div>
                  <IconButton aria-controls='dropdown-menu' aria-haspopup='true' onClick={handleClickAnchorEl}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id='dropdown-menu'
                    anchorEl={anchorElForClick}
                    open={Boolean(anchorElForClick)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDeleteReply(reply.id);
                        handleClose();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </Box>
            );
          })}

          <TextField
            sx={{
              width: '95%'
            }}
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
        </Box>
      )}
    </>
  );
};

export default Comment;
