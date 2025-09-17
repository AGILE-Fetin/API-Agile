# 🚀 FETIN API - Marketplace Completo

API REST completa para marketplace com sistema de pagamentos PIX, autenticação segura e múltiplos módulos.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Endpoints](#-endpoints)
- [Autenticação](#-autenticação)
- [Sistema PIX](#-sistema-pix)
- [Segurança](#-segurança)
- [Testes](#-testes)

## ✨ Funcionalidades

### **Módulos Principais**
- 🔐 **Autenticação JWT** com middleware de segurança
- 💳 **Sistema PIX** completo (QR Code + Copiar/Colar)
- 🚗 **Automóveis** - CRUD completo
- 🏠 **Imóveis** - Gestão de propriedades
- 🛠️ **Serviços** - Marketplace de serviços
- 👥 **Prestadores** - Cadastro de prestadores
- 📦 **Pedidos** - Sistema de pedidos
- ⭐ **Avaliações** - Sistema de estrelas
- 🔔 **Notificações** - Sistema de notificações
- 💰 **Transações** - Histórico financeiro

### **Recursos de Segurança**
- 🛡️ **Proteção CSRF** em todas as rotas sensíveis
- 🔒 **Rate Limiting** para prevenir spam
- 🚫 **Mass Assignment Protection**
- ✅ **Validação robusta** de dados
- 📝 **Logs de segurança** estruturados
- 🔑 **Headers de segurança** implementados

## 🛠️ Tecnologias

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **QRCode** para geração de códigos PIX
- **Jest** + **Supertest** para testes
- **CORS** para integração frontend

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd API

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm start

# Para desenvolvimento (com nodemon)
npm run dev
```

## ⚙️ Configuração

### Arquivo `.env`
```bash
# Database
MONGO_URI=mongodb://localhost:27017/fetin

# JWT (OBRIGATÓRIO: Use chave forte)
JWT_SECRET=sua_chave_super_secreta_de_pelo_menos_32_caracteres

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# PIX
PIX_MERCHANT_NAME=Sua Empresa
PIX_MERCHANT_CITY=Sua Cidade

# Security
BCRYPT_ROUNDS=12
JWT_EXPIRES_IN=7d
CSRF_ENABLED=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 Endpoints

### **Autenticação**
```
POST   /api/auth/register     # Registrar usuário
POST   /api/auth/login        # Login
GET    /api/auth/profile      # Perfil do usuário
```

### **PIX (💳 Novo!)**
```
POST   /api/pix/gerar         # Gerar código PIX + QR Code
GET    /api/pix/status/:id    # Verificar status pagamento
GET    /api/pix/transacoes    # Listar transações
```

### **Automóveis**
```
GET    /api/automoveis        # Listar todos
POST   /api/automoveis        # Criar (Auth + CSRF)
GET    /api/automoveis/:id    # Buscar por ID
PUT    /api/automoveis/:id    # Atualizar (Auth + CSRF)
DELETE /api/automoveis/:id    # Deletar (Auth + CSRF)
```

### **Imóveis**
```
GET    /api/imoveis           # Listar todos
POST   /api/imoveis           # Criar (Auth + CSRF)
GET    /api/imoveis/:id       # Buscar por ID
PUT    /api/imoveis/:id       # Atualizar (Auth + CSRF)
DELETE /api/imoveis/:id       # Deletar (Auth + CSRF)
```

### **Serviços**
```
GET    /api/servicos          # Listar todos
POST   /api/servicos          # Criar (Auth + CSRF)
GET    /api/servicos/:id      # Buscar por ID
PUT    /api/servicos/:id      # Atualizar (Auth + CSRF)
DELETE /api/servicos/:id      # Deletar (Auth + CSRF)
```

### **Prestadores**
```
GET    /api/prestadores       # Listar todos
POST   /api/prestadores       # Criar (Auth + CSRF)
GET    /api/prestadores/:id   # Buscar por ID
PUT    /api/prestadores/:id   # Atualizar (Auth + CSRF)
DELETE /api/prestadores/:id   # Deletar (Auth + CSRF)
```

### **Pedidos**
```
GET    /api/pedidos           # Listar pedidos do usuário (Auth)
POST   /api/pedidos           # Criar pedido (Auth + CSRF)
GET    /api/pedidos/:id       # Buscar por ID (Auth)
PUT    /api/pedidos/:id       # Atualizar (Auth + CSRF)
DELETE /api/pedidos/:id       # Deletar (Auth + CSRF)
```

### **Avaliações**
```
GET    /api/estrelas          # Listar avaliações (Auth)
POST   /api/estrelas          # Criar avaliação (Auth + CSRF)
GET    /api/estrelas/:id      # Buscar por ID (Auth)
PUT    /api/estrelas/:id      # Atualizar (Auth + CSRF)
DELETE /api/estrelas/:id      # Deletar (Auth + CSRF)
```

### **Notificações**
```
GET    /api/notificacoes      # Listar notificações (Auth)
POST   /api/notificacoes      # Criar notificação (Auth + CSRF)
PUT    /api/notificacoes/:id  # Marcar como lida (Auth + CSRF)
DELETE /api/notificacoes/:id  # Deletar (Auth + CSRF)
```

### **Transações**
```
GET    /api/transacoes        # Listar transações (Auth)
POST   /api/transacoes        # Criar transação (Auth + CSRF)
GET    /api/transacoes/:id    # Buscar por ID (Auth)
```

### **Utilitários**
```
GET    /api/health            # Status da API
GET    /api/csrf-token        # Obter token CSRF
```

## 🔐 Autenticação

### **Registro**
```javascript
POST /api/auth/register
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "fullName": "Nome Completo"
}
```

### **Login**
```javascript
POST /api/auth/login
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}

// Response
{
  "token": "jwt_token_aqui",
  "user": {
    "_id": "user_id",
    "email": "usuario@exemplo.com",
    "fullName": "Nome Completo",
    "roles": ["cliente"]
  }
}
```

### **Usar Token**
```javascript
// Headers para rotas protegidas
{
  "Authorization": "Bearer jwt_token_aqui",
  "Content-Type": "application/json"
}
```

## 💳 Sistema PIX

### **Gerar PIX**
```javascript
// 1. Obter token CSRF
const csrfRes = await fetch('/api/csrf-token');
const { csrfToken } = await csrfRes.json();

// 2. Gerar PIX
const response = await fetch('/api/pix/gerar', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({
    valor: 150.75,
    descricao: 'Pagamento produto',
    chavePix: '11999999999'
  })
});

const pixData = await response.json();
```

### **Response PIX**
```javascript
{
  "transacaoId": "1758141173002",
  "codigoPix": "000201010212...",        // Código para copiar
  "qrCode": "data:image/png;base64...",  // QR Code em base64
  "valor": 150.75,
  "descricao": "Pagamento produto",
  "chavePix": "11999999999",
  "merchantName": "FETIN Marketplace",
  "merchantCity": "Santa Rita do Sapucai",
  "status": "pendente",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### **Copiar Código PIX**
```javascript
// Função para copiar código
const copiarPix = async (codigoPix) => {
  try {
    await navigator.clipboard.writeText(codigoPix);
    alert('✅ Código PIX copiado!');
  } catch (error) {
    // Fallback para navegadores antigos
    const textArea = document.createElement('textarea');
    textArea.value = codigoPix;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('✅ Código PIX copiado!');
  }
};
```

## 🛡️ Segurança

### **Proteção CSRF**
```javascript
// Todas as rotas POST/PUT/DELETE requerem token CSRF
const csrfRes = await fetch('/api/csrf-token');
const { csrfToken } = await csrfRes.json();

// Usar em headers
headers: {
  'X-CSRF-Token': csrfToken
}
```

### **Rate Limiting**
- **100 requests** por 15 minutos por IP
- Aplicado automaticamente (exceto em testes)

### **Validações Implementadas**
- ✅ **ObjectId** do MongoDB
- ✅ **Email** formato válido
- ✅ **Senha** mínimo 6 caracteres
- ✅ **Dados financeiros** (PIX/Transações)
- ✅ **Mass Assignment** prevenção

### **Headers de Segurança**
```javascript
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## 🧪 Testes

### **Executar Testes**
```bash
# Todos os testes
npm test

# Testes específicos
npm test -- auth.test.js
npm test -- pix.test.js

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### **Cobertura de Testes**
- ✅ **Autenticação** (registro, login, perfil)
- ✅ **PIX** (geração, validação, status)
- ✅ **CRUD** completo (todos os módulos)
- ✅ **Validações** de erro
- ✅ **Segurança** (CSRF, auth)

## 📊 Status dos Módulos

| Módulo | Status | Testes | Segurança |
|--------|--------|--------|-----------|
| 🔐 Auth | ✅ | ✅ | ✅ |
| 💳 PIX | ✅ | ✅ | ✅ |
| 🚗 Automóveis | ✅ | ✅ | ✅ |
| 🏠 Imóveis | ✅ | ✅ | ✅ |
| 🛠️ Serviços | ✅ | ✅ | ✅ |
| 👥 Prestadores | ✅ | ✅ | ✅ |
| 📦 Pedidos | ✅ | ✅ | ✅ |
| ⭐ Avaliações | ✅ | ✅ | ✅ |
| 🔔 Notificações | ✅ | ✅ | ✅ |
| 💰 Transações | ✅ | ✅ | ✅ |

## 🚀 Deploy

### **Variáveis de Produção**
```bash
NODE_ENV=production
MONGO_URI=mongodb://seu-mongo-producao
JWT_SECRET=chave_super_secreta_producao_32_chars
FRONTEND_URL=https://seu-dominio.com
```

### **Comandos**
```bash
# Build (se necessário)
npm run build

# Start em produção
npm start

# PM2 (recomendado)
pm2 start server.js --name "fetin-api"
```

## 📚 Documentação Adicional

- 📄 [PIX_GUIDE.md](./PIX_GUIDE.md) - Guia completo do sistema PIX
- 🔒 [SECURITY.md](./SECURITY.md) - Políticas de segurança
- 📖 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentação detalhada
- 💡 [EXAMPLES.md](./EXAMPLES.md) - Exemplos de uso

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- 📧 Email: suporte@fetin.com
- 📱 WhatsApp: (35) 99999-9999
- 🌐 Site: https://fetin.com

---

**FETIN API v1.0.0** - Marketplace completo com sistema PIX integrado 🚀