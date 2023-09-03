const { model, Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  userName: { type: String, unique: true },
  user: { type: String, unique: true },
  passwordHash: { type: String },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});

userSchema.plugin(uniqueValidator);

const appModel = model('User', userSchema);

module.exports = appModel;
