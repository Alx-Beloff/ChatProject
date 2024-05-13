import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';
import ChatMessage from './ChatMessage';

export default function MessagesList(): JSX.Element {
  const messages = useAppSelector((store) => store.messages.messages);
  console.log(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="messages-list-wrapper overflow-auto m-">
      <Stack>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id}/>
        ))}
      </Stack>
      <div ref={messagesEndRef} /> {/* Элемент, который мы будем прокручивать вниз */}
    </div>
  );
}