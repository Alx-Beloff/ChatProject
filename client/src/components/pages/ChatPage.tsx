import React, { useEffect, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UsersLists from '../ui/UsersLists';
import ChatComponent from '../ui/ChatComponent';

export default function ChatPage(): JSX.Element {
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000');
    const socket = socketRef.current;
    socket.onmessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data);
      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          break;

        default:
          break;
      }
    };
  }, []);

  const users = [];
  const messages = [];
  const loggedUser = null;
  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3">Chat</h1>
        </Col>
      </Row>
      <Card className="p-4">
        <Row>
          <Col xs={2}>
            <UsersLists users={users.filter((el) => el.id !== loggedUser.id)} />
          </Col>
          <Col xs={10}>
            <ChatComponent messages={messages} loggedUser={loggedUser} />
            {/* {typingUser && `${typingUser.name} is typing now...`} */}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
