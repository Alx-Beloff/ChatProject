import React from 'react';
import { Stack } from 'react-bootstrap';

export default function MessagesList(): JSX.Element {
  const messages = [];
  const loggedUser = null;
  return (
    <div className="overflow-auto" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} loggedUser={loggedUser} />
        ))}
      </Stack>
    </div>
  );
}
