const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum_app_2',
  });

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);

      process.exit(1);
    } else {
      console.log('Connected to MySQL');
    }
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const userRoutes = require('./routes/userAPI')(db);
  //const threadRoutes = require('./routes/threadRoute')(db);
  //const replyRoutes = require('./routes/replyRoute')(db);

app.use('/user', userRoutes);
//app.use('/thread', threadRoutes);
//app.use('/reply', replyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });