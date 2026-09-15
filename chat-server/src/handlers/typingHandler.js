const typingHandler = {
  handleTyping: (io, socket, data) => {
    const { userId, conversationId } = data;

    if (!userId || !conversationId) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    // Notify others in conversation that user is typing
    socket.to(`conversation:${conversationId}`).emit('user:typing', {
      userId,
      timestamp: new Date().toISOString()
    });
  },

  handleStopTyping: (io, socket, data) => {
    const { userId, conversationId } = data;

    if (!userId || !conversationId) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    // Notify others in conversation that user stopped typing
    socket.to(`conversation:${conversationId}`).emit('user:stop_typing', {
      userId,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = typingHandler;
