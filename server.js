const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
app.use(bodyParser.json());

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user into database with role
    await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, hashedPassword, role]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Verify password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // User authentication successful
    res.json({ message: 'User authenticated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Welcome message for Learning Management System
app.get('/', (req, res) => {
  res.send('Welcome to the Learning Management System!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
