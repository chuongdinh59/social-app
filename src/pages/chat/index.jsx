import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Divider, InputAdornment, IconButton, TextField, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ChatCard from './ChatCard'; // Adjust the import path
import Navbar from '../../components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { db } from '../../firebase/config';
import {
  addDoc,
  and,
  collection,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import UserContext from '../../context/UserContext';
import ChatContext from '../../context/ChatContext';

const chatData = [];
const ChatList = () => {
  const { profile } = useContext(UserContext);
  const { recipient, setRecipient } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sendMessage = async () => {
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }
    const { id, displayName, avatar } = profile;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: avatar,
      createdAt: serverTimestamp(),
      senderId: profile.id,
      recipientId: recipient.id
    });
    setMessage('');
  };
  useEffect(() => {
    // const fetch = async (query) => {
    //   const querySnapshot = await getDocs(query);
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data());
    //   });
    // };
    // or(where('senderId', '==', profile.id), where('recipientId', '==', profile.id)),

    const q1 = query(
      collection(db, 'messages'),
      or(
        and(where('senderId', '==', profile.id), where('recipientId', '==', recipient.id)),
        and(where('senderId', '==', recipient.id), where('recipientId', '==', profile.id))
      ),
      orderBy('createdAt', 'desc'),
      limit(8)
    );
    // const q2 = query(
    //   collection(db, 'messages'),
    //   where('recipientId', '==', recipient.id),
    //   orderBy('createdAt', 'desc'),
    //   limit(8)
    // );

    const unsubscribe = onSnapshot(q1, (QuerySnapshot) => {
      console.log(QuerySnapshot);
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages([...messages, ...fetchedMessages].reverse());
    });
    // const unsubscribe2 = onSnapshot(q2, (QuerySnapshot) => {
    //   console.log(QuerySnapshot);
    //   const fetchedMessages = [];
    //   QuerySnapshot.forEach((doc) => {
    //     fetchedMessages.push({ ...doc.data(), id: doc.id });
    //   });
    //   setMessages([...messages, ...fetchedMessages]);
    // });
    // fetch(q1);
    return () => {
      unsubscribe();
      // unsubscribe2();
    };
  }, []);
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                sendMessage();
              }
            }}
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
            {messages.map((msg, index) => (
              <Message key={index} message={msg.text} isMyMessage={msg.senderId === profile.id} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatList;
