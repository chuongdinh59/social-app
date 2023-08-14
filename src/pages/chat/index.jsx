import React from 'react';
import { Box, Grid, Divider, InputAdornment, IconButton, TextField, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ChatCard from './ChatCard'; // Adjust the import path
import Navbar from '../../components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

const chatData = [
  {
    name: 'Ronaldo ',
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: '15 mins ago',
    avatar: 'https://example.com/avatars/alex.jpg',
    hasNewMessage: true
  },
  {
    name: 'Messi',
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: '15 mins ago',
    avatar: 'https://example.com/avatars/alex.jpg',
    hasNewMessage: true
  },
  {
    name: 'John Doe',
    message: 'Hey, how are you?',
    timestamp: '5 mins ago',
    avatar: 'https://example.com/avatars/john.jpg',
    hasNewMessage: true
  },
  {
    name: 'Jane Smith',
    message: 'I saw that movie last night. It was amazing!',
    timestamp: '10 mins ago',
    avatar: 'https://example.com/avatars/jane.jpg',
    hasNewMessage: false
  },
  {
    name: 'Alex Teles',
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: '15 mins ago',
    avatar: 'https://example.com/avatars/alex.jpg',
    hasNewMessage: true
  }
];
const messageData = [
  {
    content: "Sure, let's meet tomorrow at the cafe.",
    timestamp: '15 mins ago',
    isMyMessage: false
  },
  {
    content: 'Hey, how are you?',
    timestamp: '5 mins ago',
    isMyMessage: true
  },
  {
    content: 'I saw that movie last night. It was amazing!',
    timestamp: '10 mins ago',
    isMyMessage: false
  },
  {
    content: "Sure, let's meet tomorrow at the cafe.",
    timestamp: '15 mins ago',
    isMyMessage: true
  },
  {
    content: 'Good morning! How was your day?',
    timestamp: '25 mins ago',
    isMyMessage: false
  },
  {
    content: 'I heard the news, that sounds interesting.',
    timestamp: '40 mins ago',
    isMyMessage: false
  },
  {
    content: 'Just wanted to check in, are you free later?',
    timestamp: '1 hour ago',
    isMyMessage: true
  },
  {
    content: "Sorry, I can't make it tomorrow.",
    timestamp: '2 hours ago',
    isMyMessage: false
  },
  {
    content: 'No worries, we can reschedule.',
    timestamp: '2 hours ago',
    isMyMessage: true
  },
  {
    content: 'Have a great day!',
    timestamp: '3 hours ago',
    isMyMessage: false
  },
  {
    content: 'What do you think about this project?',
    timestamp: '4 hours ago',
    isMyMessage: true
  },
  {
    content: 'I think it has great potential!',
    timestamp: '4 hours ago',
    isMyMessage: false
  },
  {
    content: "Let's meet at the park on Sunday.",
    timestamp: '5 hours ago',
    isMyMessage: true
  },
  {
    content: 'Sounds like a plan!',
    timestamp: '5 hours ago',
    isMyMessage: false
  },
  {
    content: 'Did you watch the latest episode?',
    timestamp: '6 hours ago',
    isMyMessage: false
  },
  {
    content: "No, I haven't had the chance yet.",
    timestamp: '6 hours ago',
    isMyMessage: true
  },
  {
    content: 'Looking forward to our trip next week!',
    timestamp: '7 hours ago',
    isMyMessage: false
  },
  {
    content: 'Me too, it will be a great adventure!',
    timestamp: '7 hours ago',
    isMyMessage: true
  },
  {
    content: 'Let me know when you are available to talk.',
    timestamp: '8 hours ago',
    isMyMessage: false
  },
  {
    content: "I'm free now. Want to have a call?",
    timestamp: '8 hours ago',
    isMyMessage: true
  }
];
const ChatList = () => {
  return (
    <Box
      bgcolor={'background.default'}
      color={'text.primary'}
      sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}
    >
      <Navbar />
      <Grid container spacing={2} padding={1}>
        <Grid item xs={3} padding={2}>
          <div
            style={{
              overflowY: chatData.length > 4 ? 'scroll' : 'auto',
              maxHeight: 'calc(100vh - 64px)',
              borderRight: '1px solid #ccc'
            }}
          >
            <TextField
              label='Search'
              variant='outlined'
              size='small'
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Divider style={{ margin: '15px 0px' }} />
            {chatData.map((chat, index) => (
              <ChatCard key={index} {...chat} />
            ))}
          </div>
        </Grid>
        <Grid
          item
          padding={2}
          xs={9}
          style={{ height: `calc(100vh - 64px)`, display: 'flex', flexDirection: 'column-reverse' }}
        >
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Type your message...'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box padding={2} overflow={'scroll'}>
            {messageData.map((chat, index) => (
              <Message key={index} message={chat.content} isMyMessage={chat.isMyMessage} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatList;
