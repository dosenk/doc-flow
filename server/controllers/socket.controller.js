const { Server } = require('socket.io');

const io = (httpServer) => {
  const ioServ = new Server(httpServer, {
    cors: {
      cors: true,
      transports: ['websocket', 'polling'],
      methods: ['GET', 'POST']
    }
  });

  ioServ.on('connection', (socket) => {
    socket.emit('infoEvent', 'user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return ioServ;
};

module.exports = io;
