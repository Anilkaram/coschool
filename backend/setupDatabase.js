const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database', 'coschool.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
});

// Create tables and seed initial data
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        teacher_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        course_id INTEGER,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id),
        UNIQUE(student_id, course_id)
      )`);

      // Seed initial data
      db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (err) return reject(err);
        
        if (row.count === 0) {
          const salt = bcrypt.genSaltSync(10);
          const teacherPassword = bcrypt.hashSync('teacher123', salt);
          const studentPassword = bcrypt.hashSync('student123', salt);
          
          db.run(`INSERT INTO users (username, email, password_hash, role) VALUES 
            ('teacher1', 'teacher@coschool.com', ?, 'teacher'),
            ('student1', 'student@coschool.com', ?, 'student')`, 
            [teacherPassword, studentPassword], (err) => {
              if (err) return reject(err);
              
              db.run(`INSERT INTO courses (title, description, teacher_id) VALUES
                ('Introduction to Programming', 'Learn basic programming concepts', 1),
                ('Web Development', 'Build modern web applications', 1)`, (err) => {
                  if (err) return reject(err);
                  resolve();
              });
          });
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = initializeDatabase;