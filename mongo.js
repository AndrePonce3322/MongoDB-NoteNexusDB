// Read files and execute
require('dotenv').config();
const mongoose = require('mongoose');

const connection = process.env.MONGODB_URI;

// Mongoose connection
mongoose
  .connect(connection)
  .then(() => console.log('¡Database Conected!'))
  .catch((err) => {
    console.error('Ha ocurrido un error', err);
    mongoose.connection.close();
  });

process.on('uncaughtException', () => {
  mongoose.connection.close();
});
