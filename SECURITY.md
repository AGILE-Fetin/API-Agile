# Guia de Segurança - API FETIN

## Medidas de Segurança Implementadas

### 🔐 Autenticação e Autorização
- **JWT Tokens** para autenticação
- **Middleware de autorização** em todas as rotas protegidas
- **Validação de ObjectId** para prevenir ataques de injeção

### 🛡️ Proteção CSRF
- **Tokens CSRF únicos** por sessão
- **Validação obrigatória** em operações de modificação (POST, PUT, DELETE)
- **Endpoint dedicado** para obter tokens: `GET /api/auth/csrf-token`

### 🚦 Rate Limiting
- **Limite geral**: 100 requests por 15 minutos
- **Limite de autenticação**: 5 tentativas por 15 minutos
- **Headers informativos** sobre limites restantes

### 🔍 Validação de Entrada
- **Sanitização** de strings de entrada
- **Validação de email** com regex
- **Validação de senha** (mínimo 6 caracteres)
- **Prevenção de Mass Assignment** com allowlist de campos

### 🔒 Headers de Segurança
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy` básico
- `Strict-Transport-Security` (HTTPS)

### 📊 Modelos com Validação
- **Campos obrigatórios** definidos
- **Enums** para valores categóricos
- **Limites min/max** para números
- **Validação de tipos** de dados

## Como Usar

### Obter Token CSRF
```javascript
const response = await fetch('/api/auth/csrf-token');
const { csrfToken } = await response.json();
```

### Fazer Requisições Protegidas
```javascript
fetch('/api/automoveis', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

### Variáveis de Ambiente Necessárias
```env
JWT_SECRET=seu_jwt_secret_super_seguro
MONGO_URI=mongodb://localhost:27017/fetin
FRONTEND_URL=http://localhost:3000
NODE_ENV=production
```

## Recomendações Adicionais

### Para Produção
1. **Use HTTPS** sempre
2. **Configure firewall** adequadamente
3. **Monitore logs** de segurança
4. **Atualize dependências** regularmente
5. **Use Redis** para rate limiting em escala
6. **Implemente logging** de tentativas suspeitas

### Testes de Segurança
- Execute `npm audit` regularmente
- Teste endpoints com dados maliciosos
- Verifique headers de segurança
- Teste rate limiting
- Valide proteção CSRF

## Contato
Para reportar vulnerabilidades de segurança, entre em contato através dos canais oficiais.