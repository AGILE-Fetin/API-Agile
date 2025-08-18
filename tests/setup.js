const mongoose = require('mongoose');
require('dotenv').config();

// Definir ambiente de teste
process.env.NODE_ENV = 'test';

// Aumentar timeout para operações de banco
jest.setTimeout(30000);

// Setup global para todos os testes
beforeAll(async () => {
  // Conectar ao banco de teste se não estiver conectado
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/fetin_test');
  }
});

afterAll(async () => {
  // Fechar conexão após todos os testes
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});