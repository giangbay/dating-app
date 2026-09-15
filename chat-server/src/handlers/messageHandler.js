const messageHandler = {
  handleSendMessage: async (io, socket, data, db) => {
    const { senderId, receiverId, conversationId, message, messageType } = data;

    if (!senderId || !receiverId || !message || !conversationId) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    try {
      // Save message to database
      const query = `
        INSERT INTO messages (conversation_id, sender_id, receiver_id, message_text, message_type, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
      `;

      const result = await db.query(query, [
        conversationId,
        senderId,
        receiverId,
        message,
        messageType || 'text'
      ]);

      const messageData = {
        id: result.insertId,
        senderId,
        receiverId,
        conversationId,
        message,
        messageType: messageType || 'text',
        timestamp: new Date().toISOString(),
        isRead: false
      };

      // Emit to conversation room
      io.to(`conversation:${conversationId}`).emit('message:received', messageData);
      console.log(`Message saved: ${messageData.id}`);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  },

  handleReadMessage: async (io, socket, data, db) => {
    const { messageId, conversationId } = data;

    if (!messageId || !conversationId) {
      socket.emit('error', { message: 'Missing required fields' });
      return;
    }

    try {
      const query = 'UPDATE messages SET is_read = 1, read_at = NOW() WHERE id = ?';
      await db.query(query, [messageId]);

      // Notify conversation that message was read
      io.to(`conversation:${conversationId}`).emit('message:read', {
        messageId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      socket.emit('error', { message: 'Failed to mark message as read' });
    }
  }
};

module.exports = messageHandler;
