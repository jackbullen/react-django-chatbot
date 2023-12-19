import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface SendMessageButtonProps {
  sendMessage: () => void;
  isSending: boolean;
}

const SendMessageButton: React.FC<SendMessageButtonProps> = ({ sendMessage, isSending }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={!isSending && <SendIcon />}
      onClick={sendMessage}
      disabled={isSending}
      sx={{
        mt: 1,
        float: 'right',
        ':hover': {
          bgcolor: 'secondary.main',
        }
      }}
    >
      {isSending ? <CircularProgress size={24} /> : <SendIcon />}
      Send
    </Button>
  );
}

export default SendMessageButton;
