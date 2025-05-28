const express = require('express');
const cors = require('cors');
const path = require('path');
const setupDatabase = require('./setupDatabase');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

// Initialize database and routes
setupDatabase().then(() => {
  app.use('/api', routes);
  
  // Frontend routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});