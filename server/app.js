require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { createServer } = require('http');
const config = require('./config/serverConfig');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index.routes');

config(app);

app.use('/', indexRouter);

const server = createServer(app);

server.on('upgrade', upgradeCb);

app.listen(PORT, () => {
  console.log(`App has been started in port ${PORT}...`);
});
