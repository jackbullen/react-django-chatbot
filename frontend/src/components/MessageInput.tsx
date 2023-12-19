import React, { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ message, setMessage, onSend }) => {
  const [error, setError] = useState<string>('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (message.trim() === '') {
        setError('Message cannot be empty');
      } else {
        setError('');
        onSend();
      }
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <>
      <TextField
        fullWidth
        label="Type a message"
        variant="outlined"
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ mt: 1, mb: 1 }} // Margin top and bottom
        error={!!error}
        helperText={error}
      />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MessageInput;
