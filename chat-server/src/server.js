const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const Database = require('./config/database');
const socketHandler = require('./handlers/socketHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS_ORIGINS.split(','),
    methods: ['GET', 'POST']
  },
  path: process.env.SOCKET_IO_PATH
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
const db = new Database();
db.connect();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chat server is running' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Handle socket events
  socketHandler(io, socket, db);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Chat server running at ${HOST}:${PORT}`);
});
