const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'student' } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (err, user) => {
      if (err) throw err;
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      db.run(
        'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role],
        function(err) {
          if (err) throw err;
          
          // Generate token
          const token = jwt.sign(
            { userId: this.lastID },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
          );
          
          res.status(201).json({
            user: { id: this.lastID, username, email, role },
            token
          });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );
      
      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};