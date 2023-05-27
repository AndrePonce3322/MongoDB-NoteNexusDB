const { user_schema } = require('../controllers/users');
const api = require('./server.test');

const mongoose = require('mongoose');
const { server } = require('../index');

describe.only('usersRouter', () => {
  test('Creating an user to save', async () => {
    const newUser = {
      userName: 'Buenas que tal todo bien?',
      user: 'Hello world mi brother',
      password: 'cracl12312312312',
    };

    const result = await api
      .post('/db/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('to be unique');
  });

  test('Getting all users', async () => {
    const allUsers = await user_schema.find({});
    const everyUser = allUsers.map((user) => user.toJSON());
    expect(everyUser).toHaveLength(everyUser.length);
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});
