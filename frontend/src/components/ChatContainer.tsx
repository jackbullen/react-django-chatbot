import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSentByCurrentUser: boolean;
}

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  return (
    <Paper sx={{
      maxHeight: 500,
      overflow: 'auto',
      marginTop: '1rem',
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '8px'
    }}>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id} sx={{
            display: 'flex',
            justifyContent: message.isSentByCurrentUser ? 'flex-end' : 'flex-start',
            flexDirection: 'column',
            alignItems: message.isSentByCurrentUser ? 'flex-end' : 'flex-start'
          }}>
            <ListItemText 
              primary={
                <ReactMarkdown>
                  {message.text}
                </ReactMarkdown>
              } 
              sx={{
                padding: '0px 16px', // horizontal vertical padding
                borderRadius: '8px',
                margin: '5px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                bgcolor: message.isSentByCurrentUser ? '#e3f2fd' : '#eeeeee',
                maxWidth: '75%'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ChatContainer;
