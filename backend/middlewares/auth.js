const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    db.get('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };