import React from 'react';
import { Card } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';

export default function ChatMessage({ message }): JSX.Element {
  console.log('====================================');
  console.log(message);
  console.log('====================================');
  const loggedUser = useAppSelector((store) => store.auth.user);

  const isCurrentUser = message.User.username === loggedUser.username;
  const messageAlignment = isCurrentUser ? 'flex-end' : 'flex-start';

  const messageTime = message.updatedAt
    ? new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div style={{ display: 'flex', justifyContent: messageAlignment, margin: '10px 15px' }}>
      <Card style={{ maxWidth: '75%', position: 'relative' }}>
        <Card.Body
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: isCurrentUser ? 'row-reverse' : 'row',
            overflowWrap: 'anywhere',
            whiteSpace: 'normal',
          }}
        >
          {!isCurrentUser && (
            <div style={{ marginRight: '10px' }}>
              <img
                src={message.User.img}
                alt="User Avatar"
                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                className="rounded-circle"
              />
            </div>
          )}
          <div>
            {!isCurrentUser && (
              <Card.Subtitle className="mb-2 text-muted">{message.User.username}</Card.Subtitle>
            )}
            <Card.Text>{message.text}</Card.Text>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 5,
              fontSize: '10px',
              color: 'gray',
            }}
          >
            {messageTime}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
