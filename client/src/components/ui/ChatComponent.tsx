import React from 'react';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';

type ChatComponentProps = {
  submitMessage: (input: string) => void;
};
export default function ChatComponent({ submitMessage }: ChatComponentProps): JSX.Element {
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
