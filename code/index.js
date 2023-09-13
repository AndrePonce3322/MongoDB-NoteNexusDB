// Read env files and execute
require('dotenv').config();

console.clear()

// Server
const express = require('express');
const cors = require('cors');
const app = express();

require('./mongo.js')

// Routes with Express
const { usersRouter } = require('./controllers/users.js');
const notesRouter = require('./controllers/notes.js');

// Cors options
// const corsOptions = {
//   origin: 'https://ng-notenexus.netlify.app',
//   optionsSuccessStatus: 200,
// };

// Middle´s Ware
app.use(cors('*'));
app.use(express.json());

// Error´s MiddleWare
const notFound = require('./middleware/notfound.js');
const handleError = require('./middleware/handleError.js');
const loginRouter = require('./controllers/login.js');
const verifyRouter = require('./controllers/verify.js');

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
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
