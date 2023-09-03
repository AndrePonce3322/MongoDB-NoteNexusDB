const { model, Schema } = require('mongoose');

const esquema = new Schema({
  title: String,
  content: String,
  important: Boolean,
  favorite: Boolean,
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const modelo = model('Note', esquema);

esquema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = modelo;
