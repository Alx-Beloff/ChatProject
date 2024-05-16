import React from 'react';
import { Card } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks';
import type { MessageType } from '../../types/messageType';

type ChatComponentProps = {
  message: MessageType;
};
export default function ChatMessage({ message }: ChatComponentProps): JSX.Element {
  const loggedUser = useAppSelector((store) => store.auth.user);
  const isCurrentUser =
    loggedUser.status === 'logged' && message.User.username === loggedUser.username;
  const messageAlignment = isCurrentUser ? 'flex-end' : 'flex-start';

  const messageTime = message.updatedAt
    ? new Date(message.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: messageAlignment,
        margin: '15px 15px 0px 70px',
        height: '50%',
      }}
    >
      <Card
        style={{
          maxWidth: '85%',
          position: 'relative',
          borderColor: 'none',
          border: '0px solid transparent',
          borderRadius: '20px',
        }}
      >
        <Card.Body
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: isCurrentUser ? 'row-reverse' : 'row',
            overflowWrap: 'anywhere',
            whiteSpace: 'normal',
            backgroundColor: isCurrentUser ? '#50d5cf' : '#ffffff',
            borderRadius: '20px',
            padding: '10px 20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
          }}
        >
          {!isCurrentUser && (
            <div style={{ marginRight: '5px' }}>
              <img
                src={message.User.img}
                alt="User Avatar"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'absolute',
                  left: '-60px',
                  bottom: '1px',
                }}
                className="rounded-circle"
              />
            </div>
          )}
          <div>
            {!isCurrentUser && (
              <Card.Subtitle className="mb-2 text-muted" style={{ padding: '1px 0px 1px' }}>
                {message.User.username}
              </Card.Subtitle>
            )}
            <Card.Text style={{ color: isCurrentUser ? 'white' : 'black' }}>
              {message.text}
            </Card.Text>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -15,
              right: 15,
              fontSize: '9px',
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
