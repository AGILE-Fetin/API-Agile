# 💡 Exemplos Práticos da API FETIN

Este documento contém exemplos práticos de como usar a API em diferentes cenários.

## 🔐 Autenticação

### Registrar um novo usuário
```javascript
const registerUser = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'joao@exemplo.com',
      password: 'minhasenha123',
      fullName: 'João Silva'
    })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', data.token);
    console.log('Usuário registrado:', data.user);
  } else {
    console.error('Erro:', data.message);
  }
};
```

### Fazer login
```javascript
const loginUser = async () => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'joao@exemplo.com',
      password: 'minhasenha123'
    })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', data.token);
    return data.token;
  } else {
    throw new Error(data.message);
  }
};
```

## 🚗 Gerenciamento de Automóveis

### Listar todos os automóveis
```javascript
const getAutomoveis = async () => {
  const response = await fetch('http://localhost:5000/api/automoveis');
  const automoveis = await response.json();
  
  automoveis.forEach(auto => {
    console.log(`${auto.title} - R$ ${auto.automobileDetails.price}`);
  });
};
```

### Criar um novo automóvel
```javascript
const createAutomovel = async (token) => {
  const automovelData = {
    title: 'Honda Civic 2020',
    description: 'Sedan executivo em excelente estado',
    imagesUrls: [
      'https://exemplo.com/civic-frente.jpg',
      'https://exemplo.com/civic-lateral.jpg'
    ],
    videoUrl: 'https://exemplo.com/civic-video.mp4',
    listingType: 'venda',
    status: 'ativo',
    location: {
      fullAddress: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    automobileDetails: {
      make: 'Honda',
      model: 'Civic',
      yearManufacture: 2020,
      yearModel: 2020,
      mileage: 25000,
      fuelType: 'Flex',
      transmission: 'Automático',
      color: 'Prata',
      doors: 4,
      plateEnding: '5',
      options: ['Ar-condicionado', 'Direção hidráulica', 'Vidros elétricos'],
      conservationState: 'Excelente',
      price: 85000
    }
  };

  const response = await fetch('http://localhost:5000/api/automoveis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(automovelData)
  });

  const result = await response.json();
  console.log('Automóvel criado:', result);
};
```

## 🏠 Gerenciamento de Imóveis

### Criar um imóvel para venda
```javascript
const createImovel = async (token) => {
  const imovelData = {
    title: 'Apartamento 3 quartos - Copacabana',
    description: 'Apartamento amplo com vista para o mar',
    imagesUrls: [
      'https://exemplo.com/apto-sala.jpg',
      'https://exemplo.com/apto-quarto.jpg'
    ],
    videoUrl: 'https://exemplo.com/apto-tour.mp4',
    listingType: 'venda',
    status: 'ativo',
    location: {
      fullAddress: 'Rua Barata Ribeiro, 500',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22040-000'
    },
    imovelDetails: {
      type: 'apartamento',
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 1,
      area: 120,
      price: 850000,
      condoFee: 800,
      iptu: 2400,
      furnished: false,
      petsAllowed: true,
      description: 'Apartamento reformado com acabamento de primeira'
    }
  };

  const response = await fetch('http://localhost:5000/api/imoveis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(imovelData)
  });

  return await response.json();
};
```

## 🔧 Serviços e Prestadores

### Cadastrar um prestador de serviços
```javascript
const createPrestador = async (token) => {
  const prestadorData = {
    title: 'TechFix - Assistência Técnica',
    description: 'Especializada em reparo de eletrônicos e computadores',
    listingType: 'empresa',
    status: 'ativo',
    location: {
      fullAddress: 'Rua da Tecnologia, 123',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30112-000'
    },
    serviceDetails: {
      serviceCategory: 'Tecnologia',
      averagePrice: '80',
      estimatedExecutionTime: '2-3 dias úteis',
      servicePortfolioImages: [
        'https://exemplo.com/servico1.jpg',
        'https://exemplo.com/servico2.jpg'
      ]
    }
  };

  const response = await fetch('http://localhost:5000/api/prestadores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(prestadorData)
  });

  return await response.json();
};
```

### Criar um serviço
```javascript
const createServico = async (token) => {
  const servicoData = {
    title: 'Limpeza Residencial Completa',
    description: 'Serviço completo de limpeza para residências',
    category: 'Limpeza',
    price: 120,
    location: {
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000'
    },
    imagesUrls: ['https://exemplo.com/limpeza.jpg'],
    videoUrl: 'https://exemplo.com/limpeza-demo.mp4'
  };

  const response = await fetch('http://localhost:5000/api/servicos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(servicoData)
  });

  return await response.json();
};
```

## 📦 Sistema de Pedidos

### Criar um pedido
```javascript
const createPedido = async (token, imovelId) => {
  const pedidoData = {
    items: [
      {
        productId: imovelId,
        productModel: 'Imovel',
        quantity: 1,
        price: 850000
      }
    ],
    totalAmount: 850000,
    paymentMethod: 'Financiamento',
    deliveryAddress: {
      street: 'Rua das Flores',
      number: '456',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
      country: 'Brasil'
    },
    notes: 'Interessado em visitar o imóvel'
  };

  const response = await fetch('http://localhost:5000/api/pedidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(pedidoData)
  });

  return await response.json();
};
```

## 💳 Transações

### Processar uma transação
```javascript
const createTransacao = async (token, pedidoId) => {
  const transacaoData = {
    pedidoId: pedidoId,
    valor: 850000,
    metodoPagamento: 'Cartão de Crédito'
  };

  const response = await fetch('http://localhost:5000/api/transacoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transacaoData)
  });

  return await response.json();
};
```

## 🔔 Notificações

### Criar uma notificação
```javascript
const createNotificacao = async (token) => {
  const notificacaoData = {
    titulo: 'Novo interesse no seu imóvel',
    mensagem: 'Um usuário demonstrou interesse no seu apartamento em Copacabana',
    tipo: 'interesse',
    lida: false
  };

  const response = await fetch('http://localhost:5000/api/notificacoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(notificacaoData)
  });

  return await response.json();
};
```

### Marcar notificação como lida
```javascript
const markAsRead = async (token, notificacaoId) => {
  const response = await fetch(`http://localhost:5000/api/notificacoes/${notificacaoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ lida: true })
  });

  return await response.json();
};
```

## ⭐ Sistema de Avaliações

### Criar uma avaliação
```javascript
const createAvaliacao = async (token, automovelId) => {
  const avaliacaoData = {
    produtoId: automovelId,
    produtoModelo: 'Automovel',
    nota: 5,
    comentario: 'Excelente carro! Muito bem conservado e o vendedor foi muito atencioso.'
  };

  const response = await fetch('http://localhost:5000/api/estrelas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(avaliacaoData)
  });

  return await response.json();
};
```

## 🔄 Fluxo Completo de Uso

### Exemplo: Usuário comprando um automóvel
```javascript
const exemploCompletoCompra = async () => {
  try {
    // 1. Registrar/Login
    const token = await loginUser();
    
    // 2. Buscar automóveis disponíveis
    const automoveis = await fetch('http://localhost:5000/api/automoveis')
      .then(res => res.json());
    
    const automovelEscolhido = automoveis[0]; // Escolher o primeiro
    
    // 3. Criar pedido
    const pedido = await createPedido(token, automovelEscolhido._id);
    
    // 4. Processar transação
    const transacao = await createTransacao(token, pedido._id);
    
    // 5. Criar avaliação após a compra
    const avaliacao = await createAvaliacao(token, automovelEscolhido._id);
    
    console.log('Compra realizada com sucesso!');
    console.log('Pedido:', pedido._id);
    console.log('Transação:', transacao._id);
    
  } catch (error) {
    console.error('Erro na compra:', error.message);
  }
};
```

## 🛠️ Utilitários

### Função para fazer requisições autenticadas
```javascript
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`http://localhost:5000/api${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }
  
  return await response.json();
};

// Uso:
// const automoveis = await apiRequest('/automoveis');
// const novoAutomovel = await apiRequest('/automoveis', {
//   method: 'POST',
//   body: JSON.stringify(automovelData)
// });
```

### Tratamento de erros
```javascript
const handleApiError = (error) => {
  if (error.message.includes('401')) {
    // Token expirado, redirecionar para login
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else if (error.message.includes('403')) {
    alert('Acesso negado. Você não tem permissão para esta ação.');
  } else if (error.message.includes('404')) {
    alert('Recurso não encontrado.');
  } else {
    alert(`Erro: ${error.message}`);
  }
};
```

## 📱 Integração com Frontend

### React Hook personalizado
```javascript
import { useState, useEffect } from 'react';

const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest(endpoint);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Uso no componente:
// const { data: automoveis, loading, error } = useApi('/automoveis');
```

---

Estes exemplos cobrem os principais casos de uso da API. Para mais detalhes, consulte a [documentação completa](./API_DOCUMENTATION.md).