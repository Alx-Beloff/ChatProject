import React from 'react';
import { Stack } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';
import ChatMessage from './ChatMessage';

export default function MessagesList(): JSX.Element {
  const messages = useAppSelector((store) => store.messages.messages);
  console.log(messages);

  return (
    <div className="overflow-auto" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id}/>
        ))}
      </Stack>
    </div>
  );
}
