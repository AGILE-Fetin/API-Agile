const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Imóveis', () => {
  let token = '';
  let imovelCriadoId = '';

  const novo = {
    title: 'Apartamento Luxo',
    description: 'Apartamento bem localizado com ótima estrutura',
    imagesUrls: ['https://meusite.com/apartamento.jpg'],
    videoUrl: 'https://meusite.com/video.mp4',
    listingType: 'venda',
    status: 'ativo',
    location: {
      fullAddress: 'Rua Central, 123',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-002'
    },
    imovelDetails: {
      type: 'apartamento',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 2,
      area: 120,
      price: 650000,
      rentPrice: null,
      condoFee: 500,
      iptu: 1200,
      furnished: true,
      petsAllowed: true,
      description: 'Apartamento mobiliado com varanda gourmet'
    }
  };

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'imovel@teste.com',
        password: '123456',
        fullName: 'Usuário Imóvel'
      });
    token = userRes.body.token;
  });

  test('GET /api/imoveis - deve retornar a lista de imóveis', async () => {
    const res = await request(app).get('/api/imoveis');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/imoveis - deve criar um novo imóvel', async () => {
    const res = await request(app)
      .post('/api/imoveis')
      .set('Authorization', `Bearer ${token}`)
      .send(novo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    imovelCriadoId = res.body._id;
  });

  test('GET /api/imoveis/:id - deve retornar um imóvel específico', async () => {
    const res = await request(app)
      .get(`/api/imoveis/${imovelCriadoId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', imovelCriadoId);
  });

  test('PUT /api/imoveis/:id - deve atualizar um imóvel existente', async () => {
    const atualizacao = {
      title: 'Apartamento Luxo - Atualizado',
      description: 'Com varanda gourmet e espaço pet'
    };

    const res = await request(app)
      .put(`/api/imoveis/${imovelCriadoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(atualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', atualizacao.title);
  });

  test('DELETE /api/imoveis/:id - deve remover um imóvel existente', async () => {
    const res = await request(app)
      .delete(`/api/imoveis/${imovelCriadoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Imóvel removido com sucesso');
  });
});
