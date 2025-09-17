# 💳 Guia Completo - Sistema PIX

## 🚀 Funcionalidades Implementadas

- ✅ **Gerar código PIX** (copiar e colar)
- ✅ **QR Code automático** (base64)
- ✅ **Verificar status** do pagamento
- ✅ **Validações completas** de segurança
- ✅ **Proteção CSRF** e autenticação

## 📡 Endpoints Disponíveis

### 1. Gerar PIX
```
POST /api/pix/gerar
```

**Headers:**
```javascript
{
  "Authorization": "Bearer seu_jwt_token",
  "Content-Type": "application/json",
  "X-CSRF-Token": "csrf_token_obtido"
}
```

**Body:**
```javascript
{
  "valor": 150.75,
  "descricao": "Pagamento do produto XYZ",
  "chavePix": "11999999999"
}
```

**Response:**
```javascript
{
  "transacaoId": "1704067200000",
  "codigoPix": "00020126580014br.gov.bcb.pix...",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "valor": 150.75,
  "descricao": "Pagamento do produto XYZ",
  "chavePix": "11999999999",
  "merchantName": "FETIN Marketplace",
  "merchantCity": "Santa Rita do Sapucai",
  "status": "pendente",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### 2. Verificar Status
```
GET /api/pix/status/:transacaoId
```

### 3. Listar Transações
```
GET /api/pix/transacoes
```

## 💻 Como Usar no Frontend

### 1. Função Completa para Gerar PIX
```javascript
const gerarPixCompleto = async (valor, descricao, chavePix) => {
  try {
    // 1. Obter token CSRF
    const csrfRes = await fetch('/api/csrf-token');
    const { csrfToken } = await csrfRes.json();

    // 2. Gerar PIX
    const response = await fetch('/api/pix/gerar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        valor: parseFloat(valor),
        descricao,
        chavePix
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar PIX');
    }

    const pixData = await response.json();
    return pixData;

  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};
```

### 2. Função para Copiar Código PIX
```javascript
const copiarCodigoPix = async (codigoPix) => {
  try {
    await navigator.clipboard.writeText(codigoPix);
    alert('✅ Código PIX copiado para a área de transferência!');
    return true;
  } catch (error) {
    // Fallback para navegadores antigos
    const textArea = document.createElement('textarea');
    textArea.value = codigoPix;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('✅ Código PIX copiado!');
    return true;
  }
};
```

### 3. Componente React Completo
```jsx
import React, { useState } from 'react';

const ComponentePix = ({ valor, descricao, chavePix }) => {
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGerarPix = async () => {
    setLoading(true);
    try {
      const data = await gerarPixCompleto(valor, descricao, chavePix);
      setPixData(data);
      setStatus('PIX gerado com sucesso!');
    } catch (error) {
      setStatus('Erro ao gerar PIX: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopiarCodigo = () => {
    copiarCodigoPix(pixData.codigoPix);
  };

  const verificarPagamento = async () => {
    try {
      const response = await fetch(`/api/pix/status/${pixData.transacaoId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const statusData = await response.json();
      
      if (statusData.status === 'pago') {
        setStatus('✅ Pagamento confirmado!');
      } else {
        setStatus('⏳ Aguardando pagamento...');
      }
    } catch (error) {
      setStatus('Erro ao verificar status');
    }
  };

  return (
    <div className="pix-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h3>💳 Pagamento PIX</h3>
      <div className="info">
        <p><strong>Valor:</strong> R$ {valor?.toFixed(2)}</p>
        <p><strong>Descrição:</strong> {descricao}</p>
      </div>

      {!pixData ? (
        <button 
          onClick={handleGerarPix} 
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#00BC63',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Gerando PIX...' : '🔄 Gerar PIX'}
        </button>
      ) : (
        <div className="pix-gerado">
          {/* QR Code */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img 
              src={pixData.qrCode} 
              alt="QR Code PIX" 
              style={{ maxWidth: '250px', border: '2px solid #ddd', borderRadius: '8px' }}
            />
            <p style={{ fontSize: '12px', color: '#666' }}>
              Escaneie o QR Code com seu banco
            </p>
          </div>

          {/* Código PIX */}
          <div className="codigo-container">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Código PIX (Copiar e Colar):
            </label>
            <textarea 
              value={pixData.codigoPix}
              readOnly
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
                resize: 'none',
                backgroundColor: '#f9f9f9'
              }}
            />
            <button 
              onClick={handleCopiarCodigo}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              📋 Copiar Código PIX
            </button>
          </div>

          {/* Verificar Status */}
          <button 
            onClick={verificarPagamento}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginTop: '10px',
              cursor: 'pointer'
            }}
          >
            🔍 Verificar Pagamento
          </button>

          {/* Status */}
          {status && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: status.includes('Erro') ? '#f8d7da' : '#d4edda',
              color: status.includes('Erro') ? '#721c24' : '#155724',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {status}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentePix;
```

## ⚙️ Configuração Necessária

### .env
```bash
PIX_MERCHANT_NAME=Sua Empresa Ltda
PIX_MERCHANT_CITY=Sua Cidade
PIX_CHAVE_DEFAULT=sua_chave_pix_padrao
```

### Tipos de Chave PIX Aceitos
- **CPF**: 11 dígitos (ex: 12345678901)
- **CNPJ**: 14 dígitos (ex: 12345678000195)  
- **Email**: formato válido (ex: pix@empresa.com)
- **Telefone**: +55 + DDD + número (ex: +5511999999999)
- **Chave Aleatória**: UUID gerado pelo banco

## 🔒 Segurança Implementada

- ✅ **Autenticação JWT** obrigatória
- ✅ **Proteção CSRF** em todas as operações
- ✅ **Validação de dados** rigorosa
- ✅ **Sanitização** de entradas
- ✅ **Rate limiting** para evitar spam

## 🧪 Testar a API

```bash
# Executar testes PIX
npm test -- pix.test.js
```

## 📱 Exemplo de Uso Completo

```javascript
// 1. Gerar PIX
const pixData = await gerarPixCompleto(100.50, 'Compra produto', '11999999999');

// 2. Exibir QR Code
document.getElementById('qrcode').src = pixData.qrCode;

// 3. Disponibilizar código para copiar
document.getElementById('codigo').value = pixData.codigoPix;

// 4. Monitorar pagamento
setInterval(async () => {
  const status = await verificarStatus(pixData.transacaoId);
  if (status === 'pago') {
    alert('Pagamento confirmado!');
  }
}, 5000);
```

**Sistema PIX completo e funcional! 🚀**