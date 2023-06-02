// Read env files and execute
require('dotenv').config();

// Server
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

// Mongoose Connection
require('./src/mongo');

// Routes with Express
const { usersRouter } = require('./src/controllers/users');
const notesRouter = require('./src/controllers/notes');

// Middle´s Ware
app.use(cors());
app.use(express.json());

// Error´s MiddleWare
const notFound = require('./src/middleware/notfound');
const handleError = require('./src/middleware/handleError');
const loginRouter = require('./src/controllers/login');
const verifyRouter = require('./src/controllers/verify');

app.get('/', (req, res) => {
  res.send(
    `<a href="/db/notes" style="font-size: 30px; text-decoration: none; padding: 10px;" >¡Welcome to the Mongo Database! 👀</a>`
  );
});

app.use('/db/notes', notesRouter);
app.use('/db/users', usersRouter);
app.use('/db/login', loginRouter);
app.use('/db/verify', verifyRouter);

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`!Server Open! http://localhost:${PORT}`);
});

module.exports = { app, server };
module.exports.handler = serverless(app);