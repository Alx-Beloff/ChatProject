import React from 'react';
import { Stack } from 'react-bootstrap';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

export default function ChatComponent({ submitMessage }): JSX.Element {
  return (
    <div
      style={{
        height: 'calc(100% - 75px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#fcfcfc',
      }}
    >
      <MessagesList />
      <MessageForm submitMessage={submitMessage} />
    </div>
  );
}
