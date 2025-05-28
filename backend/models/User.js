const db = require('../config/db');

class User {
  static async create({ username, email, password_hash, role = 'student' }) {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, password_hash, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;