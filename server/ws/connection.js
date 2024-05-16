const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Message, User } = require('../db/models');
const { Censure } = require('../utils/censure');

const map = new Map();

const connectionCb = async (socket, request) => {
  const { refreshToken } = request.cookies;
  const { user: userFromJwt } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const spotIdQueryParam = request.url;
  const spotId = spotIdQueryParam.split('=')[1];

  if (!map.has(spotId)) {
    map.set(spotId, new Map());
  }
  map.get(spotId).set(userFromJwt.id, { ws: socket, user: userFromJwt });

  const spotMessages = await Message.findAll({ where: { spotId }, include: User });

  map.get(spotId).forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        type: 'SET_HISTORY_FROM_SERVER',
        payload: spotMessages,
      }),
    ),
  );

  map.get(spotId).forEach(({ ws }) =>
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.get(spotId).values()].map(({ user }) => user),
      }),
    ),
  );

  socket.on('error', console.error);

  socket.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        if (Censure.isBad(payload)) {
          const sanitizedPayload = Censure.replace(payload);
          const newMessage = await Message.create({
            text: sanitizedPayload,
            userId: userFromJwt.id,
            spotId,
          });
          const messageWithUser = await Message.findByPk(newMessage.id, { include: User });
          map.get(spotId).forEach(({ ws }) =>
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithUser,
              }),
            ),
          );
        } else {
          const newMessage = await Message.create({
            text: payload,
            userId: userFromJwt.id,
            spotId,
          });
          const messageWithUser = await Message.findByPk(newMessage.id, { include: User });
          map.get(spotId).forEach(({ ws }) =>
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
    map.get(spotId).delete(userFromJwt.id);
    map.get(spotId).forEach(({ ws }) =>
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: { users: [...map.get(spotId).values()].map(({ user }) => user) },
        }),
      ),
    );
  });
};

module.exports = connectionCb;
