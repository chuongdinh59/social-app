import { useState } from 'react';
import { Typography, IconButton, TextField, Button, Box, Avatar } from '@mui/material';
import { ThumbUp, ThumbDown, Reply } from '@mui/icons-material';
import { Status } from '../mock/post';

const Comment = ({ comment }) => {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleAddReply = () => {
    if (reply.trim() !== '') {
      const newReply = {
        user: {
          // alumni_id: '2051052016',
          // email: 'bobwilliams@example.com',
          // status: Status.ACTIVE,
          // created_date: '20-11-2023',
          // modified_date: '20-11-2023',
          // avatar: 'https://source.unsplash.com/random?wallpapers',
          displayName: 'Bob Williams'
        }, // Replace with the actual user
        content: reply
      };
      setReplies([...replies, newReply]);
      setReply('');
    }
  };

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Avatar src={comment.user.avatar} alt={comment.user.displayName} />
        <Typography variant='body2' color='text.secondary' sx={{ marginLeft: 2 }}>
          <strong>{comment.user.displayName}</strong>: {comment.content}
        </Typography>
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
      <IconButton size='small' aria-label='reply'>
        <Reply />
      </IconButton>
      <Typography variant='caption'>
        {replies.length} {/* Replace with the actual replies count */}
      </Typography>
      {replies.map((reply, index) => (
        <Typography key={index} variant='body2' color='text.secondary' sx={{ marginLeft: 2 }}>
          <strong>{reply.user.displayName}</strong>: {reply.content}
        </Typography>
      ))}
      <TextField fullWidth label='Reply' value={reply} onChange={handleReplyChange} variant='outlined' margin='dense' />
      <Button variant='contained' onClick={handleAddReply}>
        Add Reply
      </Button>
    </>
  );
};

export default Comment;
