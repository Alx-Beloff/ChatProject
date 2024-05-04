const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Message, User } = require('../db/models');

const map = new Map();

const connectionCb = (socket, request) => {
  const { refreshToken } = request.cookies;
  const { user: userFromJwt } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  console.log({ userFromJwt });
  map.set(userFromJwt.id, { ws: socket, user: userFromJwt });

  map.forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.values()].map(({ user }) => user),
      }),
    ),
  );

  socket.on('error', console.error);

  socket.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        {
          const newMessage = await Message.create({
            text: payload,
            userId: userFromJwt.id,
          });
          const messageWithUser = await Message.findByPk(newMessage.id, { include: User });

          map.forEach(({ ws }) =>
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithUser,
              }),
            ),
          );
        }
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJwt.id);
    map.forEach(({ ws }) =>
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: [...map.values()].map(({ user }) => user),
        }),
      ),
    );
  });
};

module.exports = connectionCb;
