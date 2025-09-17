const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

let token;
let userId;

describe('Rotas de Usuário', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test('POST /api/auth/register - registrar novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: process.env.TEST_EMAIL || 'usuario@teste.com',
        password: process.env.TEST_PASSWORD || '123456',
        fullName: 'Usuário Teste'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', process.env.TEST_EMAIL || 'usuario@teste.com');

    token = res.body.token;
    userId = res.body.user._id;
  });

  test('POST /api/auth/login - autenticar usuário', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_EMAIL || 'usuario@teste.com',
        password: process.env.TEST_PASSWORD || '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /api/auth/profile - retornar perfil autenticado', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', process.env.TEST_EMAIL || 'usuario@teste.com');
    userId = res.body._id; // Atualizar userId
  });

  test('PUT /api/users/:id - atualizar usuário', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ fullName: 'Usuário Atualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe('Usuário Atualizado');
  });

  test('DELETE /api/users/:id - deletar usuário', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Usuário deletado com sucesso');
  });
});
