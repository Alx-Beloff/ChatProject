import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ChatComponent from '../ui/ChatComponent';
import { useAppDispatch } from '../../redux/hooks';
import { setMessages, setUsers } from '../../redux/slices/messages/messagesSlice';
import AppNavbar from '../ui/AppNavbar';
import AppModal from '../ui/AppModal';
import type { UserType } from '../../types/userTypes';
import type { MessageType } from '../../types/messageType';

type MessageData = {
  type: string;
  payload: UserType | MessageType;
};

export default function ChatPage(): JSX.Element {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  const { spotId } = useParams<{ spotId: string }>();

  useEffect(() => {
    socketRef.current = new WebSocket(`${import.meta.env.VITE_WS_URL}/?spotId=${spotId}`);
    const socket = socketRef.current;

    socket.onmessage = (event: MessageEvent<string>) => {
      const { type, payload } = JSON.parse(event.data) as MessageData;

      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          dispatch(setUsers(payload as UserType));
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          dispatch(setMessages(payload as MessageType));
          break;
        case 'SET_HISTORY_FROM_SERVER':
          dispatch(setMessages(payload as MessageType));
          break;

        default:
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch, spotId]);

  const submitMessage = (input: string): void => {
    if (input.trim() !== '') {
      const socket = socketRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input }));
      }
    }
  };

  return (
    <Container
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      className="col-lg-8 col-xl-7 p-0"
    >
      <AppNavbar />
      <ChatComponent submitMessage={submitMessage} />
      <AppModal />
    </Container>
  );
}
