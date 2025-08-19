const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

let token;
let userId;

describe('Rotas de Autenticação', () => {
  beforeAll(async () => {
    // Limpar usuários antes dos testes
    await User.deleteMany({});
  });
  test('POST /api/auth/register - deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'novo@teste.com',
        password: '123456',
        fullName: 'Usuário Teste'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'novo@teste.com');

    token = res.body.token;
    userId = res.body.user._id;
  });

  test('POST /api/auth/login - deve autenticar usuário existente', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'novo@teste.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /api/auth/profile - deve retornar dados do usuário autenticado', async () => {
    // Fazer login novamente para garantir que o usuário existe
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'novo@teste.com',
        password: '123456'
      });
    
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'novo@teste.com');
  });
});
