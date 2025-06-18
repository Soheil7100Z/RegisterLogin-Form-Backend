const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('MySQL Connected!');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      location VARCHAR(100),
      register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createTableQuery, (error, result) => {
    if (error) {
      console.error('Error creating users table:', error);
    } else {
      console.log('Users table is ready (created or already exists).');
    }
  });
});

module.exports = db;
