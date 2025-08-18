const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Notificações', () => {
  let token, notificacaoId;

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'notificacao@teste.com',
        password: '123456',
        fullName: 'Usuário Notificação'
      });
    token = userRes.body.token;
  });

  test('POST /api/notificacoes - criar notificação', async () => {
    const res = await request(app)
      .post('/api/notificacoes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Nova mensagem',
        mensagem: 'Você recebeu uma nova mensagem do sistema',
        tipo: 'info',
        lida: false
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    notificacaoId = res.body._id;
  });

  test('GET /api/notificacoes - listar notificações', async () => {
    const res = await request(app)
      .get('/api/notificacoes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/notificacoes/:id - buscar notificação específica', async () => {
    const res = await request(app)
      .get(`/api/notificacoes/${notificacaoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', notificacaoId);
  });

  test('PUT /api/notificacoes/:id - atualizar notificação', async () => {
    const res = await request(app)
      .put(`/api/notificacoes/${notificacaoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ lida: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.lida).toBe(true);
  });

  test('DELETE /api/notificacoes/:id - excluir notificação', async () => {
    const res = await request(app)
      .delete(`/api/notificacoes/${notificacaoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
