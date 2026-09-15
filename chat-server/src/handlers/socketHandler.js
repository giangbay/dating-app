const messageHandler = require('./messageHandler');
const userHandler = require('./userHandler');
const typingHandler = require('./typingHandler');

module.exports = (io, socket, db) => {
  // User handlers
  socket.on('user:join', (data) => userHandler.handleJoin(io, socket, data, db));
  socket.on('user:leave', (data) => userHandler.handleLeave(io, socket, data, db));

  // Message handlers
  socket.on('message:send', (data) => messageHandler.handleSendMessage(io, socket, data, db));
  socket.on('message:read', (data) => messageHandler.handleReadMessage(io, socket, data, db));
  socket.on('message:typing', (data) => typingHandler.handleTyping(io, socket, data));
  socket.on('message:stop_typing', (data) => typingHandler.handleStopTyping(io, socket, data));
};
