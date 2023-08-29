// Read env files and execute
require('dotenv').config();

// Server
const express = require('express');
const cors = require('cors');
const app = express();

// Mongoose Connection
require('./mongo');

// Routes with Express
const { usersRouter } = require('./controllers/users');
const notesRouter = require('./controllers/notes');

// Cors options
const corsOptions = {
  origin: 'https://ng-notenexus.netlify.app',
  optionsSuccessStatus: 200,
};

// Middle´s Ware
app.use(cors(corsOptions));
app.use(express.json());

// Error´s MiddleWare
const notFound = require('./middleware/notfound');
const handleError = require('./middleware/handleError');
const loginRouter = require('./controllers/login');
const verifyRouter = require('./controllers/verify');

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
