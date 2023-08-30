import { Reply, ThumbDown, ThumbUp } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import commentService from '../apis/commentService';
import { getProfileFromLS } from '../utils/auth';
const Comment = ({ comment, handleDelete }) => {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorElForClick, setAnchorElForClick] = useState(null);

  const handleClickAnchorEl = (event) => {
    setAnchorElForClick(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElForClick(null);
  };
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
        display='flex'
        alignItems='center'
        sx={{
          marginTop: '30px'
        }}
      >
        <Avatar src={comment.user.avatar} alt={comment.user.displayName} />
        <Typography variant='body2' color='text.secondary' sx={{ marginLeft: 2 }}>
          <strong
            style={{
              fontWeight: 700,
              fontSize: '16px'
            }}
          >
            {comment.user.displayName}
          </strong>
          : {comment.content}
        </Typography>
        <div>
          <IconButton aria-controls='dropdown-menu' aria-haspopup='true' onClick={handleClickAnchorEl}>
            <MoreVertIcon />
          </IconButton>
          <Menu id='dropdown-menu' anchorEl={anchorElForClick} open={Boolean(anchorElForClick)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(comment.id);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      </Box>
      <Typography variant='caption'>
        Likes: {comment.action_count} {/* Replace with the actual likes count */}
      </Typography>
      <IconButton size='small' aria-label='like'>
        <ThumbUp />
      </IconButton>
      <IconButton size='small' aria-label='dislike'>
        <ThumbDown />
      </IconButton>
      <IconButton size='small' aria-label='reply' onClick={() => handleShowReply(page)}>
        <Reply />
      </IconButton>
      {/* <Typography variant='caption'>{replies.length}</Typography> */}

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
