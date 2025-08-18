const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Automóveis', () => {
  let token = '';
  let automovelCriadoId = '';

  const novo = {
    title: 'Fiat Uno 2012',
    description: 'Carro econômico e bem conservado',
    imagesUrls: ['https://meusite.com/uno.jpg'],
    videoUrl: 'https://meusite.com/video.mp4',
    listingType: 'venda',
    status: 'ativo',
    location: {
      fullAddress: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000'
    },
    automobileDetails: {
      make: 'Fiat',
      model: 'Uno',
      yearManufacture: 2012,
      yearModel: 2013,
      mileage: 85000,
      fuelType: 'Flex',
      transmission: 'Manual',
      color: 'Branco',
      doors: 4,
      plateEnding: '7',
      options: ['Ar-condicionado', 'Travas elétricas'],
      conservationState: 'Bom',
      price: 18000,
      rentPrice: null
    }
  };

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'automovel@teste.com',
        password: '123456',
        fullName: 'Usuário Automóvel'
      });
    token = userRes.body.token;
  });

  test('GET /api/automoveis - deve retornar a lista de automóveis', async () => {
    const res = await request(app)
      .get('/api/automoveis')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/automoveis - deve criar um novo automóvel', async () => {
    const res = await request(app)
      .post('/api/automoveis')
      .set('Authorization', `Bearer ${token}`)
      .send(novo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    automovelCriadoId = res.body._id; // <- Aqui armazenamos o ID
  });

  test('GET /api/automoveis/:id - deve retornar um automóvel específico', async () => {
    const res = await request(app)
      .get(`/api/automoveis/${automovelCriadoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', automovelCriadoId);
  });

  test('PUT /api/automoveis/:id - deve atualizar um automóvel existente', async () => {
    const atualizacao = {
      title: 'Fiat Uno 2012 - Atualizado',
      description: 'Versão atualizada com mais conforto'
    };

    const res = await request(app)
      .put(`/api/automoveis/${automovelCriadoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(atualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', atualizacao.title);
  });

  test('DELETE /api/automoveis/:id - deve remover um automóvel existente', async () => {
    const res = await request(app)
      .delete(`/api/automoveis/${automovelCriadoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Automóvel removido com sucesso');
  });
});
