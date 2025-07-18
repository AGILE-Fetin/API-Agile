const request = require('supertest');
const app = require('../index');

describe('Rotas de Automóveis', () => {
  let token = '';
  let userId = '';

  beforeAll(async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'warley@email.com', password: '123456' });

    token = res.body.token;
    userId = res.body.usuario.id;  // pega o id real
    });

  const novo = {
    title: 'Fiat Uno 2012',
    description: 'Carro econômico e bem conservado',
    imagesUrls: ['https://meusite.com/uno.jpg'],
    videoUrl: 'https://meusite.com/video.mp4',
    listingType: 'venda',
    status: 'ativo',
    postedBy: userId,  // usa o id correto aqui
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
    // Fazer login para obter token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'warley@email.com', password: '123456' });
    token = res.body.token;
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
  });
});
