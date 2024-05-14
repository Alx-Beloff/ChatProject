import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../redux/hooks';
import ChatMessage from './ChatMessage';

export default function MessagesList(): JSX.Element {
  const messages = useAppSelector((store) => store.messages.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <motion.div
      className="messages-list-wrapper overflow-auto m-"
      style={{ backgroundColor: '#fcfcfc' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Stack gap={2}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
      <div ref={messagesEndRef} />
    </motion.div>
  );
}
