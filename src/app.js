const express = require('express');
require('dotenv').config();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log('Connected to port ', PORT);
});
