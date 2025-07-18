const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const autenticarToken = require('./middlewares/authMiddleware');
const automovelRoutes = require('./routes/automovelRoutes');
const imovelRoutes = require('./routes/imovelRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Rotas públicas
app.use('/api/auth', authRoutes);
app.use('/api/automoveis', automovelRoutes); // ← apenas GET públicos (definido no controller)
app.use('/api/imoveis', imovelRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/pedidos', pedidoRoutes);

// ✅ Middleware de autenticação
app.use(autenticarToken);

// ✅ Rotas privadas (POST, PUT, DELETE já são protegidas nos controllers)
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// ✅ Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'Servidor rodando' });
});

// ✅ Exporta app para testes
module.exports = app;

// ✅ Inicia servidor (somente se chamado diretamente)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
