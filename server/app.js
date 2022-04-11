require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const { createServer } = require('http');
const io = require('./controllers/socket.controller');
const mainRouter = require('./routes/main.route');
const api = require('./routes/api');
const errorMiddleware = require('./middlewares/error.middleware');
const db = require('./db/connection');

const app = express();
const httpServer = createServer(app);
const ioServer = io(httpServer);
const { PORT } = process.env;

app.use(express.static('../build'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

app.use((req, res, next) => {
  req.io = ioServer;
  return next();
});

app.post('/qr', async (req, res) => {
  res.send('qr data recived');
  req.io.emit('qrDataEvent', req.body);
  const rows = await db.pool.query('SELECT * FROM otm');
  return rows;
});

app.use('/', mainRouter);
app.use('/api', api);
app.use(errorMiddleware);

httpServer.listen(PORT);
