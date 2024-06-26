require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.locals.user = user;

    next();
  } catch (error) {
    console.log('no refresh token', error);
    res.clearCookie('refreshToken').sendStatus(403);
  }
}

module.exports = verifyRefreshToken;
