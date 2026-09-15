const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      this.pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async query(sql, values = []) {
    try {
      const connection = await this.pool.getConnection();
      const [results] = await connection.query(sql, values);
      connection.release();
      return results;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async getConnection() {
    return await this.pool.getConnection();
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

module.exports = Database;
