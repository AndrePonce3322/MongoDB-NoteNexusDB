// Read files and execute
require('dotenv').config();
const mongoose = require('mongoose');

const connection = process.env.MONGODB_URI.toString();

// Mongoose connection
mongoose
  .connect(connection)
  .then(() => console.log('¡Database Conected!'))
  .catch((err) => {
    console.error('Ha ocurrido un error', err);
    mongoose.connection.close();
  });

process.on('uncaughtException', (e) => {
  console.error('¡Uncaught Exception! 💥', e);
  mongoose.connection.close();
});