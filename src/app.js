const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api', routes);

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  const [rows] = await connection.execute('SELECT NOW() AS now');
  console.log('⏰ Time:', rows[0].now);

  await connection.end();
}

main();

app.listen(PORT, () => {
  console.log('Connected to port ', PORT);
});
