// Read files and execute
require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.PASSWORD;

const connection = `mongodb+srv://andreponce417:${password}@primerbasededatos.j5k5jo0.mongodb.net/DataBase_Primordial?retryWrites=true&w=majority
`;

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
