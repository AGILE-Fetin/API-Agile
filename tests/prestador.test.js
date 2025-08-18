const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Prestadores', () => {
  let token;
  let prestadorId;

  beforeAll(async () => {
    await User.deleteMany({});
    
    // Registrar usuário para obter token
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'prestador@teste.com',
        password: '123456',
        fullName: 'Usuário Prestador'
      });
    token = userRes.body.token;
  });

  test('POST /api/prestadores - criar prestador', async () => {
    const mock = {
      title: "Empresa XPTO",
      description: "Serviços de construção civil",
      listingType: "empresa",
      status: "ativo",
      location: {
        fullAddress: "Rua Exemplo, 123",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      serviceDetails: {
        serviceCategory: "Construção",
        averagePrice: "1000",
        estimatedExecutionTime: "30 dias",
        servicePortfolioImages: []
      }
    };
    const res = await request(app)
      .post('/api/prestadores')
      .set('Authorization', `Bearer ${token}`)
      .send(mock);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(mock.title);
    prestadorId = res.body._id;
  });

  test('GET /api/prestadores - listar todos', async () => {
    const res = await request(app)
      .get('/api/prestadores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/prestadores/:id - obter por ID', async () => {
    const res = await request(app)
      .get(`/api/prestadores/${prestadorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', prestadorId);
  });

  test('PUT /api/prestadores/:id - atualizar prestador', async () => {
    const updateData = { status: "inativo" };
    const res = await request(app)
      .put(`/api/prestadores/${prestadorId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(updateData.status);
  });

  test('DELETE /api/prestadores/:id - deletar prestador', async () => {
    const res = await request(app)
      .delete(`/api/prestadores/${prestadorId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Prestador deletado com sucesso');
  });
});
