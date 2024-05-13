import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ChatComponent from '../ui/ChatComponent';
import { useAppDispatch } from '../../redux/hooks';
import { setMessages, setUsers } from '../../redux/slices/messages/messagesSlice';
import AppNavbar from '../ui/AppNavbar';
import AppModal from '../ui/AppModal';

export default function ChatPage(): JSX.Element {
  const socketRef = useRef(null);
  const dispatch = useAppDispatch();
  const { spotId } = useParams();

  useEffect(() => {
    socketRef.current = new WebSocket(`${import.meta.env.VITE_WS_URL}/?spotId=${spotId}`);
    const socket = socketRef.current;
    socket.onmessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          dispatch(setUsers(payload));
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          dispatch(setMessages(payload));
          break;

        case 'SET_HISTORY_FROM_SERVER':
          dispatch(setMessages(payload));
          break;

        default:
          break;
      }
    };
  }, []);

  const submitMessage = (input) => {
    if (input !== '') {
      const socket = socketRef.current;
      socket.send(JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input }));
    }
  };
  return (
    <Container
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      className="col-lg-8 col-xl-7 p-0"
    >
      <AppNavbar />
      <ChatComponent submitMessage={submitMessage} socketRef={socketRef} />
      <AppModal />
    </Container>
  );
}
