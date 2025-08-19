const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas de Transações', () => {
  let token, pedidoId, transacaoId, userId;

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'transacao@teste.com',
        password: '123456',
        fullName: 'Usuário Transação'
      });
    token = userRes.body.token;
    userId = userRes.body.user._id;

    // Criar um imóvel e pedido para usar na transação
    const imovel = await request(app)
      .post('/api/imoveis')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Apartamento Teste',
        description: 'Teste',
        imagesUrls: ['https://teste.com/img.jpg'],
        videoUrl: 'https://teste.com/video.mp4',
        listingType: 'venda',
        status: 'ativo',
        location: { fullAddress: 'Rua Teste', city: 'Cidade', state: 'SP', zipCode: '00000-000' },
        imovelDetails: { type: 'Apartamento', bedrooms: 2, bathrooms: 1, parkingSpaces: 1, area: 80, price: 250000 }
      });

    const pedido = await request(app)
      .post('/api/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: userId,
        items: [{ productId: imovel.body._id, productModel: 'Imovel', quantity: 1, price: 250000 }],
        totalAmount: 250000,
        paymentMethod: 'Cartão'
      });

    pedidoId = pedido.body._id;
  });

  test('POST /api/transacoes', async () => {
    const res = await request(app)
      .post('/api/transacoes')
      .set('Authorization', `Bearer ${token}`)
      .send({ pedidoId, valor: 250000, metodoPagamento: 'Cartão' });
    expect(res.statusCode).toBe(201);
    transacaoId = res.body._id;
  });

  test('GET /api/transacoes', async () => {
    const res = await request(app)
      .get('/api/transacoes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/transacoes/:id', async () => {
    const res = await request(app)
      .get(`/api/transacoes/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('PUT /api/transacoes/:id', async () => {
    const res = await request(app)
      .put(`/api/transacoes/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Pago' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Pago');
  });

  test('DELETE /api/transacoes/:id', async () => {
    const res = await request(app)
      .delete(`/api/transacoes/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
