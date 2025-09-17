const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Testes Básicos', () => {
  beforeEach(async () => {
    // Limpar usuários antes de cada teste
    await User.deleteMany({});
  });

  test('GET /api/health - deve retornar status do servidor', async () => {
    const res = await request(app)
      .get('/api/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'Servidor rodando');
  });

  test('POST /api/auth/register - deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: process.env.TEST_EMAIL || 'teste@exemplo.com',
        password: process.env.TEST_PASSWORD || '123456',
        fullName: 'Usuário Teste'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });
});