const notesRouter = require('express').Router();

// Models
const note_model = require('../public/models/notes_eschema');
const user_model = require('../public/models/users_eschema');

// MiddleWare´s
const extract_user = require('../public/middleware/extract_user_token');

// ErrorMiddleWare
const handleError = require('../public/middleware/handleError');
const notfound = require('../public/middleware/notfound');

notesRouter.get('/', extract_user, async (req, res) => {
  const { userId } = req;

  const notes = await note_model.find({ user: userId }).populate('user', {
    notes: 0,
  });

  res.json(notes).status(200);
});

notesRouter.get('/:id', extract_user, (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  note_model
    .findById(id)
    .then((note) => {
      if (note.user != userId) {
        return res
          .status(400)
          .json({ error: 'You are not the own of the Note' });
      } else if (!note) {
        return res
          .status(404)
          .json({ error: 'No se ha podido localizar la ID de la nota' });
      }

      res.json(note).status(200);
    })
    .catch(next);
});

notesRouter.post('/', extract_user, async (req, res, next) => {
  const { title, content, important = false, favorite = false } = req.body;
  const { userId } = req;

  if (!content) {
    return res.status(400).json({ error: 'You dont send content' });
  }

  const user = await user_model.findOne({ _id: userId }).catch(next);

  if (!user) {
    return res.status(404).json({ error: 'Token ID not found' });
  }

  const send = new note_model({
    title,
    content,
    user: userId,
    favorite,
    important,
    date: new Date().toLocaleString('en'),
  });

  const saveNote = await send.save();

  user.notes = user.notes.concat(saveNote._id);
  await user.save();

  res.json(saveNote).status(200);
});

notesRouter.delete('/:id', extract_user, (req, res, next) => {
  const { id } = req.params;

  note_model
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ error: 'No se ha podido localizar la id' });
      }

      res.json(result).status(200);
    })
    .catch(next);
});

notesRouter.put('/:id', extract_user, async (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;

  if (!id || !content) {
    return res.status(400).json({ error: 'You dont send content or ID' });
  }

  const update = {
    content: content,
    important,
    date: new Date().toLocaleString('en'),
  };

  note_model
    .findByIdAndUpdate(id, update, { new: true })
    .then((result) => {
      if (!result)
        return res
          .status(404)
          .json({ error: 'No se ha podido localizar el id' });
      res.json(result).status(200);
    })
    .catch(next);
});

notesRouter.use(notfound);
notesRouter.use(handleError);

module.exports = notesRouter;
