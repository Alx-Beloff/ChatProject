import React from 'react';
import { Stack } from 'react-bootstrap';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

export default function ChatComponent({ submitMessage }): JSX.Element {
  return (
    <Stack gap={3} className="p-3">
      <MessagesList />
      <MessageForm submitMessage={submitMessage} />
    </Stack>
  );
}
