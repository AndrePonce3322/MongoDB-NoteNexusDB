const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../index');

const api = supertest(app);

test('Obteniendo data de la base', async () => {
  const response = await api.get('/db/notes');
  expect(response.body);
});

test('Obteniendo data con una IP especifica', async () => {
  await api
    .get('/db/notes/64532d53443ea01a55834f55')
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('Enviando una nota con metodo POST', async () => {
  await api
    .post('/db/notes')
    .send({
      email: 'superTest@gmail.com',
      password: 'supertest',
    })
    .set('Accept', /application\/json/)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('Eliminando notas con metodo DELETE', async () => {
  await api
    .delete('/db/notes')
    .send({
      email: '12@gmail.com',
    })
    .set('Accept', /application\/json/)
    .expect(400)
    .expect('Content-Type', 'application/json; charset=utf-8');
});

test('Actualizando una nota con metodo PUT', async () => {
  await api
    .put('/db/notes/6454555a8c6f1b833c3d1fdf')
    .send({
      password: 'onetwoorthree',
    })
    .set('Accept', /application\/json/)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  // Closing connection to the database and closing server on port
  mongoose.connection.close();
  server.close();
});

module.exports = api;
