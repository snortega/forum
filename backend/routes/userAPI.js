const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const jsonParser = express.json();

module.exports = (db) => {
// Get all users
router.get('/user', jsonParser, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json(error);
  } finally {
    connection.release();
  }
});

// Create new user
router.post('/user', jsonParser, async (req, res) => {
  const user = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO users SET ?', user);
    connection.release();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Cannot create another user with this username' });
  }
});

return router;
};
