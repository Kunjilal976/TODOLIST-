const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./route/taskRoute');

const app = express();
const port = 5173;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todos')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});