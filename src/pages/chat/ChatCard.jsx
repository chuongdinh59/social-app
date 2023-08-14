import React from 'react';
import { Card, CardContent, Typography, Avatar, Divider, IconButton } from '@mui/material';
import { Message as MessageIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const ChatCard = ({ name, message, timestamp, avatar, hasNewMessage }) => {
  return (
    <Card elevation={3} style={{ marginBottom: '16px', borderRadius: '16px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatar} alt={name} style={{ marginRight: '12px' }} />
          <div>
            <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {hasNewMessage ? 'New message' : timestamp}
            </Typography>
          </div>
        </div>
        <IconButton>
          <MessageIcon color={hasNewMessage ? 'primary' : 'inherit'} />
        </IconButton>
      </div>
      <Divider />
      <CardContent>
        <Typography variant='body1'>{message.startsWith('You: ') ? message : `${name}: ${message}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
