import { io } from 'socket.io-client';

const Socket = io('http://192.168.100.14:8080');

export default Socket;
