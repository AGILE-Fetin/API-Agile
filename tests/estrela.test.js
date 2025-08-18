const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Estrelas', () => {
  let token, estrelaId, automovelId;

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'estrela@teste.com',
        password: '123456',
        fullName: 'Usuário Estrela'
      });
    token = userRes.body.token;

    // Criar automóvel para associar à estrela
    const automovel = await request(app)
      .post('/api/automoveis')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Carro Teste',
        description: 'Automóvel teste para avaliação',
        imagesUrls: ['https://teste.com/carro.jpg'],
        price: 50000,
        year: 2022,
        mileage: 20000,
        color: 'Preto'
      });
    automovelId = automovel.body._id;
  });

  test('POST /api/estrelas - criar avaliação', async () => {
    const res = await request(app)
      .post('/api/estrelas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        produtoId: automovelId,
        produtoModelo: 'Automovel',
        nota: 5,
        comentario: 'Excelente automóvel!'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    estrelaId = res.body._id;
  });

  test('GET /api/estrelas - listar avaliações', async () => {
    const res = await request(app)
      .get('/api/estrelas')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/estrelas/:id - buscar avaliação específica', async () => {
    const res = await request(app)
      .get(`/api/estrelas/${estrelaId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', estrelaId);
  });

  test('PUT /api/estrelas/:id - atualizar avaliação', async () => {
    const res = await request(app)
      .put(`/api/estrelas/${estrelaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nota: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nota).toBe(4);
  });

  test('DELETE /api/estrelas/:id - excluir avaliação', async () => {
    const res = await request(app)
      .delete(`/api/estrelas/${estrelaId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
