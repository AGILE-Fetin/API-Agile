const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Pedidos', () => {
  let token = '';
  let pedidoId = '';
  let imovelId = '';
  let userId = '';

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'pedido@teste.com',
        password: '123456',
        fullName: 'Usuário Pedido'
      });
    token = userRes.body.token;
    userId = userRes.body.user._id;

    // Criar um imóvel para usar como produto
    const imovel = {
      title: 'Apartamento Teste',
      description: 'Imóvel para teste de pedido',
      imagesUrls: ['https://meusite.com/img.jpg'],
      videoUrl: 'https://meusite.com/video.mp4',
      listingType: 'venda',
      status: 'ativo',
      location: {
        fullAddress: 'Rua Teste, 123',
        city: 'TesteCity',
        state: 'SP',
        zipCode: '01000-000'
      },
      imovelDetails: {
        type: 'Apartamento',
        bedrooms: 2,
        bathrooms: 1,
        parkingSpaces: 1,
        area: 80,
        price: 250000,
        rentPrice: null,
        condoFee: 500,
        iptu: 150,
        furnished: false,
        petsAllowed: true,
        description: 'Lindo apartamento para testes'
      }
    };

    const resImovel = await request(app)
      .post('/api/imoveis')
      .set('Authorization', `Bearer ${token}`)
      .send(imovel);

    imovelId = resImovel.body._id;
  });

  const pedidoMock = {
    userId,
    items: [
      {
        productId: '', // será preenchido após criar imóvel
        productModel: 'Imovel',
        quantity: 1,
        price: 250000
      }
    ],
    totalAmount: 250000,
    paymentMethod: 'Cartão',
    deliveryAddress: {
      street: 'Rua Exemplo',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
      country: 'Brasil'
    },
    notes: 'Entregar à tarde'
  };

  test('POST /api/pedidos - deve criar um novo pedido', async () => {
    pedidoMock.items[0].productId = imovelId;

    const res = await request(app)
      .post('/api/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send(pedidoMock);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    pedidoId = res.body._id;
  });

  test('GET /api/pedidos - deve retornar a lista de pedidos', async () => {
    const res = await request(app)
      .get('/api/pedidos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/pedidos/:id - deve retornar um pedido específico', async () => {
    const res = await request(app)
      .get(`/api/pedidos/${pedidoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', pedidoId);
  });

  test('PUT /api/pedidos/:id - deve atualizar um pedido existente', async () => {
    const atualizacao = {
      status: 'Aprovado',
      notes: 'Atualizado via teste'
    };

    const res = await request(app)
      .put(`/api/pedidos/${pedidoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(atualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'Aprovado');
  });

  test('DELETE /api/pedidos/:id - deve remover um pedido existente', async () => {
    const res = await request(app)
      .delete(`/api/pedidos/${pedidoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Pedido deletado com sucesso');
  });
});
