const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Serviços', () => {
  let token = '';
  let servicoCriadoId = '';

  const novo = {
    title: 'Serviço de Jardinagem',
    description: 'Corte de grama, poda e manutenção',
    category: 'Jardinagem',
    price: 150,
    location: {
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30100-000'
    },
    imagesUrls: ['https://meusite.com/jardim.jpg'],
    videoUrl: 'https://meusite.com/video-jardim.mp4'
  };

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'servico@teste.com',
        password: '123456',
        fullName: 'Usuário Serviço'
      });
    token = userRes.body.token;
  });

  test('GET /api/servicos - deve retornar a lista de serviços', async () => {
    const res = await request(app)
      .get('/api/servicos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/servicos - deve criar um novo serviço', async () => {
    const res = await request(app)
      .post('/api/servicos')
      .set('Authorization', `Bearer ${token}`)
      .send(novo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    servicoCriadoId = res.body._id;
  });

  test('GET /api/servicos/:id - deve retornar um serviço específico', async () => {
    const res = await request(app)
      .get(`/api/servicos/${servicoCriadoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', servicoCriadoId);
  });

  test('PUT /api/servicos/:id - deve atualizar um serviço existente', async () => {
    const atualizacao = {
      title: 'Serviço de Jardinagem Atualizado',
      price: 180
    };

    const res = await request(app)
      .put(`/api/servicos/${servicoCriadoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(atualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', atualizacao.title);
  });

  test('DELETE /api/servicos/:id - deve remover um serviço existente', async () => {
    const res = await request(app)
      .delete(`/api/servicos/${servicoCriadoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Serviço removido com sucesso');
  });
});
