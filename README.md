# 🏢 FETIN API - Marketplace Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/Tests-50%20passing-brightgreen.svg)](./tests/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

API RESTful completa para plataforma de marketplace desenvolvida para o Instituto Nacional de Telecomunicações (INATEL).

## 🚀 Funcionalidades

- 🔐 **Autenticação JWT** - Sistema completo de login/registro
- 👥 **Gestão de Usuários** - CRUD completo com diferentes perfis
- 🚗 **Automóveis** - Marketplace de veículos
- 🏠 **Imóveis** - Plataforma imobiliária
- 🔧 **Serviços** - Catálogo de serviços
- 👷 **Prestadores** - Rede de prestadores de serviços
- 📦 **Pedidos** - Sistema de pedidos e compras
- 💳 **Transações** - Processamento de pagamentos
- 🔔 **Notificações** - Sistema de notificações em tempo real
- ⭐ **Avaliações** - Sistema de reviews e ratings

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB 6.0+
- npm ou yarn

## ⚡ Instalação Rápida

```bash
# Clone o repositório
git clone <repository-url>
cd fetin

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o MongoDB
mongod

# Execute a aplicação
npm start
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/Agile
MONGO_URI=mongodb://localhost:27017/Agile

# JWT
JWT_SECRET=sua_chave_secreta_super_forte

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Test credentials (apenas para testes)
TEST_EMAIL=test@example.com
TEST_PASSWORD=testpassword123
```

### Estrutura do Projeto

```
fetin/
├── config/
│   └── db.js                 # Configuração do MongoDB
├── controllers/              # Lógica de negócio
│   ├── authController.js
│   ├── userController.js
│   ├── automovelController.js
│   └── ...
├── middlewares/              # Middlewares customizados
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   └── ...
├── models/                   # Modelos do MongoDB
│   ├── User.js
│   ├── Automovel.js
│   └── ...
├── routes/                   # Definição das rotas
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── ...
├── tests/                    # Testes automatizados
│   ├── auth.test.js
│   ├── user.test.js
│   └── ...
├── index.js                  # Arquivo principal da aplicação
├── server.js                 # Servidor HTTP
└── package.json
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia com nodemon (auto-reload)
npm start           # Inicia em produção

# Testes
npm test            # Executa todos os testes
npm run test:basic  # Executa testes básicos
npm run test:watch  # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura

# Utilitários
npm run lint        # Verifica código (se configurado)
```

## 📚 Documentação da API

A documentação completa está disponível em [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md).

### Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Registrar usuário | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/profile` | Perfil do usuário | ✅ |
| GET | `/api/automoveis` | Listar automóveis | ❌ |
| POST | `/api/automoveis` | Criar automóvel | ✅ |
| GET | `/api/imoveis` | Listar imóveis | ❌ |
| POST | `/api/pedidos` | Criar pedido | ✅ |

### Exemplo de Uso

```javascript
// Registrar usuário
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'usuario@exemplo.com',
    password: 'senha123',
    fullName: 'João Silva'
  })
});

const { token, user } = await response.json();

// Usar token para requisições autenticadas
const automoveis = await fetch('http://localhost:5000/api/automoveis', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 🧪 Testes

O projeto possui uma suíte completa de testes automatizados:

```bash
# Executar todos os testes
npm test

# Resultado esperado:
# ✅ 11 suites de teste
# ✅ 50 testes passando
# ✅ 0 testes falhando
```

### Cobertura de Testes

- ✅ Autenticação (registro, login, perfil)
- ✅ Usuários (CRUD completo)
- ✅ Automóveis (CRUD completo)
- ✅ Imóveis (CRUD completo)
- ✅ Serviços (CRUD completo)
- ✅ Prestadores (CRUD completo)
- ✅ Pedidos (CRUD completo)
- ✅ Transações (CRUD completo)
- ✅ Notificações (CRUD completo)
- ✅ Avaliações (CRUD completo)

## 🔒 Segurança

- **JWT Authentication**: Tokens seguros para autenticação
- **Rate Limiting**: Proteção contra ataques de força bruta
- **CORS**: Configurado para origens específicas
- **Helmet**: Headers de segurança HTTP
- **Validação**: Validação rigorosa de dados de entrada
- **Sanitização**: Proteção contra injeção de código

## 🚀 Deploy

### Desenvolvimento Local
```bash
npm run dev
```

### Produção
```bash
# Definir NODE_ENV
export NODE_ENV=production

# Iniciar aplicação
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use ESLint para manter consistência
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada
- Siga os padrões REST para APIs

## 📊 Status do Projeto

- ✅ **Backend API**: Completo e funcional
- ✅ **Autenticação**: JWT implementado
- ✅ **Banco de Dados**: MongoDB configurado
- ✅ **Testes**: 100% dos endpoints testados
- ✅ **Documentação**: Completa e atualizada
- 🔄 **Frontend**: Em desenvolvimento
- 🔄 **Deploy**: Preparando para produção

## 📞 Suporte

Para dúvidas ou suporte:

- 📧 Email: suporte@inatel.br
- 📚 Documentação: [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md)
- 🐛 Issues: [GitHub Issues](./issues)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para o Instituto Nacional de Telecomunicações (INATEL)**

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2024