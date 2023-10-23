const express = require('express')
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum_app_2',
  });

  let connection = null;

  db.getConnection((err, conn) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);

      process.exit(1);
    } else {
      console.log('Connected to MySQL');
      connection = conn;
    }
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

/* ----------/user ENDPOINTS---------- */

app.post("/user", async (req,res) => {
  const user = req.body;
  const connection = await db.getConnection(); // Establish a database connection
  try {   
    await connection.query('INSERT INTO users SET ?', user);
    connection.release();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Cannot create another user with this username' });
  }
});

app.get("/user", async (req, res) => {
  const connection = await db.getConnection(); // Establish a database connection
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release(); // Release the connection back to the pool
    res.status(200).json(rows);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  const connection = await db.getConnection(); // Establish a database connection

  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    connection.release(); // Release the connection back to the pool
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------/thread ENDPOINTS---------- */

app.post("/thread", async (req,res) => {
  const thread = req.body;
  const connection = await db.getConnection(); // Establish a database connection
  try {   
    result = await connection.query('INSERT INTO threads SET ?', thread);
    const insertedId = result[0].insertId;
    connection.release();
    res.status(201).json({ id: insertedId, ...thread });
  } catch (error) {
    res.status(400).json({ message: 'Thread could not be added.' });
  }
});

app.get("/thread", async (req, res) => {
  const connection = await db.getConnection(); // Establish a database connection
  try {
    const [rows] = await connection.query('SELECT * FROM threads');
    connection.release(); // Release the connection back to the pool
    res.status(200).json(rows);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/thread/:id", async (req, res) => {
  const id = req.params.id;
  const connection = await db.getConnection(); // Establish a database connection

  try {
    const [rows] = await connection.query('SELECT * FROM threads WHERE id = ?', [id]);
    connection.release(); // Release the connection back to the pool
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Thread not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ----------/reply ENDPOINTS---------- */

app.post("/reply", async (req,res) => {
  const reply = req.body;
  const connection = await db.getConnection(); // Establish a database connection
  try {   
    result = await connection.query('INSERT INTO replies SET ?', reply);
    connection.release();
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ message: 'Reply could not be added.' });
  }
});

app.get("/reply/:to", async (req, res) => {
  const to = req.params.to;
  const connection = await db.getConnection(); // Establish a database connection

  try {
    const [rows] = await connection.query('SELECT * FROM replies WHERE reply_to = ?', [to]);
    connection.release(); // Release the connection back to the pool
    
    if (rows.length !== 0) {
      res.status(200).json(rows);
    } 
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });