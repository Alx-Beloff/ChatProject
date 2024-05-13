import React, { useEffect, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UsersLists from '../ui/UsersLists';
import ChatComponent from '../ui/ChatComponent';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMessages, setUsers } from '../../redux/slices/messages/messagesSlice';
import AppNavbar from '../ui/AppNavbar';

export default function ChatPage(): JSX.Element {
  const socketRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3001');
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
    <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} className="col-lg-8 col-xl-7 p-0">
      <AppNavbar />
      <ChatComponent submitMessage={submitMessage} socketRef={socketRef} />
    </Container>
  );
}
