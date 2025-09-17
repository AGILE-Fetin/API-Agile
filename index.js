const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const autenticarToken = require('./middlewares/authMiddleware');
const { securityHeaders } = require('./middlewares/securityMiddleware');
const { generalRateLimit } = require('./middlewares/rateLimitMiddleware');
const automovelRoutes = require('./routes/automovelRoutes');
const imovelRoutes = require('./routes/imovelRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const prestadorRoutes = require('./routes/prestadorRoutes');
const estrelaRoutes = require('./routes/estrelaRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const pixRoutes = require('./routes/pixRoutes');
const errorHandler = require('./middlewares/errorHandler');
const csrfProtection = require('./middlewares/csrfMiddleware');

dotenv.config();
connectDB();

const app = express();

// Middlewares de segurança
app.use(securityHeaders);
if (process.env.NODE_ENV !== 'test') {
  app.use(generalRateLimit);
}
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas com autenticação específica no router
app.use('/api/automoveis', automovelRoutes);
app.use('/api/imoveis', imovelRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/prestadores', prestadorRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/notificacoes', notificacaoRoutes);
app.use('/api/estrelas', estrelaRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/pix', pixRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Endpoint para obter token CSRF
app.get('/api/csrf-token', csrfProtection.getToken);

// Rota para checar saúde da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'Servidor rodando' });
});

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Exporta app para testes
module.exports = app;

// Inicia servidor apenas se executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
