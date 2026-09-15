const connectedUsers = new Map();

const userHandler = {
  handleJoin: (io, socket, data, db) => {
    const { userId, conversationId } = data;

    if (!userId || !conversationId) {
      socket.emit('error', { message: 'Missing userId or conversationId' });
      return;
    }

    // Store user connection
    connectedUsers.set(socket.id, { userId, conversationId });
    socket.join(`conversation:${conversationId}`);

    // Notify others that user is online
    io.to(`conversation:${conversationId}`).emit('user:online', {
      userId,
      timestamp: new Date().toISOString()
    });

    console.log(`User ${userId} joined conversation ${conversationId}`);
  },

  handleLeave: (io, socket, data, db) => {
    const { userId, conversationId } = data;
    const userInfo = connectedUsers.get(socket.id);

    if (userInfo) {
      connectedUsers.delete(socket.id);
      socket.leave(`conversation:${conversationId}`);

      // Notify others that user is offline
      io.to(`conversation:${conversationId}`).emit('user:offline', {
        userId,
        timestamp: new Date().toISOString()
      });

      console.log(`User ${userId} left conversation ${conversationId}`);
    }
  }
};

module.exports = userHandler;
