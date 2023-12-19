import axios from 'axios';
import React, { useState } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import SendMessageButton from './components/SendMessageButton';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSentByCurrentUser: boolean;
}

const App: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello. I am simply going to take your message and send it to http://localhost:8000/api/messages/ in a POST request. This server will then call OpenAI\'s API and return the response to me. Then I will display the response to you.',
      timestamp: new Date(),
      isSentByCurrentUser: false,
    },
  ]);

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
  });

  const sendMessage = async () => {
    if (message.trim() && !isSending) {
      setIsSending(true);

      const newMessage = {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date(),
        isSentByCurrentUser: true,
      };

      setMessages([...messages, newMessage]);
      setMessage('');
      try {
        const response = await axios.post('http://localhost:8000/api/messages/', newMessage);
        console.log('Response from backend:', response.data);
        const responseMessage = {
          id: Date.now().toString(),
          text: response.data.response,
          timestamp: new Date(),
          isSentByCurrentUser: false,
        };
        setMessages(messages => [...messages, responseMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
  
      setIsSending(false);
    }
  };
  
  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <ChatContainer messages={messages} />
          <MessageInput message={message} setMessage={setMessage} onSend={sendMessage} />
          <SendMessageButton sendMessage={sendMessage} isSending={isSending} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;