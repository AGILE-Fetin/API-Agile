# 📚 Documentação da API - FETIN

## 🚀 Visão Geral

API RESTful para plataforma de marketplace que permite gerenciar usuários, automóveis, imóveis, serviços, prestadores, pedidos, transações, notificações e avaliações.

**Base URL:** `http://localhost:5000/api`

## 🔧 Configuração

### Variáveis de Ambiente
```env
MONGODB_URI=mongodb://localhost:27017/Agile
JWT_SECRET=chave_super_secreta_123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Instalação
```bash
npm install
npm start          # Produção
npm run dev        # Desenvolvimento
npm test           # Executar testes
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header:
```
Authorization: Bearer <token>
```

---

## 📋 Endpoints

### 🔑 Autenticação (`/api/auth`)

#### POST `/api/auth/register`
Registra um novo usuário.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "fullName": "Nome Completo"
}
```

**Response (201):**
```json
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

#### POST `/api/auth/login`
Autentica um usuário existente.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "_id": "user_id",
    "email": "usuario@exemplo.com",
    "fullName": "Nome Completo"
  }
}
```

#### GET `/api/auth/profile` 🔒
Retorna dados do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "_id": "user_id",
  "email": "usuario@exemplo.com",
  "fullName": "Nome Completo",
  "roles": ["cliente"],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 👥 Usuários (`/api/users`)

#### GET `/api/users` 🔒
Lista todos os usuários.

**Response (200):**
```json
[
  {
    "_id": "user_id",
    "email": "usuario@exemplo.com",
    "fullName": "Nome Completo",
    "roles": ["cliente"]
  }
]
```

#### PUT `/api/users/:id` 🔒
Atualiza dados do usuário.

**Body:**
```json
{
  "fullName": "Novo Nome",
  "phone": "(11) 99999-9999"
}
```

#### DELETE `/api/users/:id` 🔒
Remove um usuário.

**Response (200):**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

### 🚗 Automóveis (`/api/automoveis`)

#### GET `/api/automoveis`
Lista todos os automóveis.

**Response (200):**
```json
[
  {
    "_id": "automovel_id",
    "title": "Fiat Uno 2012",
    "description": "Carro econômico",
    "listingType": "venda",
    "status": "ativo",
    "automobileDetails": {
      "make": "Fiat",
      "model": "Uno",
      "year": 2012,
      "price": 18000
    }
  }
]
```

#### POST `/api/automoveis` 🔒
Cria um novo automóvel.

**Body:**
```json
{
  "title": "Fiat Uno 2012",
  "description": "Carro econômico e bem conservado",
  "imagesUrls": ["https://exemplo.com/foto.jpg"],
  "listingType": "venda",
  "status": "ativo",
  "location": {
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01000-000"
  },
  "automobileDetails": {
    "make": "Fiat",
    "model": "Uno",
    "yearManufacture": 2012,
    "mileage": 85000,
    "fuelType": "Flex",
    "transmission": "Manual",
    "color": "Branco",
    "price": 18000
  }
}
```

#### GET `/api/automoveis/:id`
Busca automóvel por ID.

#### PUT `/api/automoveis/:id` 🔒
Atualiza automóvel.

#### DELETE `/api/automoveis/:id` 🔒
Remove automóvel.

---

### 🏠 Imóveis (`/api/imoveis`)

#### GET `/api/imoveis`
Lista todos os imóveis.

#### POST `/api/imoveis` 🔒
Cria um novo imóvel.

**Body:**
```json
{
  "title": "Apartamento Luxo",
  "description": "Apartamento bem localizado",
  "imagesUrls": ["https://exemplo.com/foto.jpg"],
  "listingType": "venda",
  "status": "ativo",
  "location": {
    "fullAddress": "Rua Central, 123",
    "city": "Belo Horizonte",
    "state": "MG",
    "zipCode": "30140-002"
  },
  "imovelDetails": {
    "type": "apartamento",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 120,
    "price": 650000,
    "condoFee": 500,
    "furnished": true
  }
}
```

#### GET `/api/imoveis/:id`
#### PUT `/api/imoveis/:id` 🔒
#### DELETE `/api/imoveis/:id` 🔒

---

### 🔧 Serviços (`/api/servicos`)

#### GET `/api/servicos`
Lista todos os serviços.

#### POST `/api/servicos` 🔒
Cria um novo serviço.

**Body:**
```json
{
  "title": "Serviço de Jardinagem",
  "description": "Corte de grama, poda e manutenção",
  "category": "Jardinagem",
  "price": 150,
  "location": {
    "city": "Belo Horizonte",
    "state": "MG",
    "zipCode": "30100-000"
  },
  "imagesUrls": ["https://exemplo.com/jardim.jpg"]
}
```

#### GET `/api/servicos/:id`
#### PUT `/api/servicos/:id` 🔒
#### DELETE `/api/servicos/:id` 🔒

---

### 👷 Prestadores (`/api/prestadores`)

#### GET `/api/prestadores`
Lista todos os prestadores.

#### POST `/api/prestadores` 🔒
Cria um novo prestador.

**Body:**
```json
{
  "title": "Empresa XPTO",
  "description": "Serviços de construção civil",
  "listingType": "empresa",
  "status": "ativo",
  "location": {
    "fullAddress": "Rua Exemplo, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  },
  "serviceDetails": {
    "serviceCategory": "Construção",
    "averagePrice": "1000",
    "estimatedExecutionTime": "30 dias"
  }
}
```

#### GET `/api/prestadores/:id`
#### PUT `/api/prestadores/:id` 🔒
#### DELETE `/api/prestadores/:id` 🔒

---

### 📦 Pedidos (`/api/pedidos`)

#### GET `/api/pedidos` 🔒
Lista pedidos do usuário.

#### POST `/api/pedidos` 🔒
Cria um novo pedido.

**Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "productModel": "Imovel",
      "quantity": 1,
      "price": 250000
    }
  ],
  "totalAmount": 250000,
  "paymentMethod": "Cartão",
  "deliveryAddress": {
    "street": "Rua Exemplo",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01000-000"
  }
}
```

#### GET `/api/pedidos/:id` 🔒
#### PUT `/api/pedidos/:id` 🔒
#### DELETE `/api/pedidos/:id` 🔒

---

### 💳 Transações (`/api/transacoes`)

#### GET `/api/transacoes` 🔒
Lista transações do usuário.

#### POST `/api/transacoes` 🔒
Cria uma nova transação.

**Body:**
```json
{
  "pedidoId": "pedido_id",
  "valor": 250000,
  "metodoPagamento": "Cartão"
}
```

#### GET `/api/transacoes/:id` 🔒
#### PUT `/api/transacoes/:id` 🔒
#### DELETE `/api/transacoes/:id` 🔒

---

### 🔔 Notificações (`/api/notificacoes`)

#### GET `/api/notificacoes` 🔒
Lista notificações do usuário.

#### POST `/api/notificacoes` 🔒
Cria uma nova notificação.

**Body:**
```json
{
  "titulo": "Nova mensagem",
  "mensagem": "Você recebeu uma nova mensagem",
  "tipo": "info",
  "lida": false
}
```

#### GET `/api/notificacoes/:id` 🔒
#### PUT `/api/notificacoes/:id` 🔒
#### DELETE `/api/notificacoes/:id` 🔒

---

### ⭐ Avaliações (`/api/estrelas`)

#### GET `/api/estrelas` 🔒
Lista avaliações.

#### POST `/api/estrelas` 🔒
Cria uma nova avaliação.

**Body:**
```json
{
  "produtoId": "product_id",
  "produtoModelo": "Automovel",
  "nota": 5,
  "comentario": "Excelente produto!"
}
```

#### GET `/api/estrelas/:id` 🔒
#### PUT `/api/estrelas/:id` 🔒
#### DELETE `/api/estrelas/:id` 🔒

---

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Acesso negado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

## 🔒 Middleware de Segurança

- **Rate Limiting**: Limite de requisições por IP
- **CORS**: Configurado para frontend específico
- **Helmet**: Headers de segurança
- **JWT**: Autenticação baseada em tokens
- **Validação**: Validação de dados de entrada

## 🧪 Testes

Execute os testes com:
```bash
npm test                # Todos os testes
npm run test:basic      # Testes básicos
npm run test:coverage   # Com cobertura
```

**Cobertura atual:** 50 testes passando em 11 suites

## 📝 Exemplos de Uso

### Fluxo completo de autenticação:
```javascript
// 1. Registrar usuário
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    fullName: 'João Silva'
  })
});

// 2. Usar token para requisições autenticadas
const token = registerResponse.token;
const profileResponse = await fetch('/api/auth/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## 🚨 Tratamento de Erros

Todas as respostas de erro seguem o padrão:
```json
{
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (apenas em desenvolvimento)"
}
```

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2024  
**Desenvolvido para:** FETIN - Instituto Nacional de Telecomunicações