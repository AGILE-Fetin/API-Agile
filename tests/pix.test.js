const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Rotas PIX', () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: process.env.TEST_EMAIL || 'pix@teste.com',
        password: process.env.TEST_PASSWORD || '123456',
        fullName: 'Usuário PIX'
      });
    token = userRes.body.token;
  });

  test('POST /api/pix/gerar - gerar código PIX com QR Code', async () => {
    const res = await request(app)
      .post('/api/pix/gerar')
      .set('Authorization', `Bearer ${token}`)
      .send({
        valor: 100.50,
        descricao: 'Pagamento teste PIX',
        chavePix: '11999999999'
      });
    

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('codigoPix');
    expect(res.body).toHaveProperty('qrCode');
    expect(res.body).toHaveProperty('transacaoId');
    expect(res.body).toHaveProperty('valor', 100.50);
    expect(res.body.codigoPix).toMatch(/^000201/); // Formato PIX
    expect(res.body.qrCode).toMatch(/^data:image\/png;base64/); // QR Code base64
  });

  test('POST /api/pix/gerar - erro valor inválido', async () => {
    const res = await request(app)
      .post('/api/pix/gerar')
      .set('Authorization', `Bearer ${token}`)
      .send({
        valor: -10,
        chavePix: '11999999999'
      });
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('GET /api/pix/status/:id - verificar status pagamento', async () => {
    const res = await request(app)
      .get('/api/pix/status/123456789')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('transacaoId', '123456789');
  });

  test('GET /api/pix/transacoes - listar transações', async () => {
    const res = await request(app)
      .get('/api/pix/transacoes')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('transacoes');
  });
});