const QRCode = require('qrcode');

// Função para gerar código PIX manual (formato BR Code)
const gerarCodigoPix = (dados) => {
  const { chavePix, valor, merchantName, merchantCity, descricao } = dados;
  
  // Formato básico do PIX (EMV)
  let codigo = '';
  
  // Payload Format Indicator
  codigo += '000201';
  
  // Point of Initiation Method
  codigo += '010212';
  
  // Merchant Account Information
  const chavePixFormatada = `0014br.gov.bcb.pix01${chavePix.length.toString().padStart(2, '0')}${chavePix}`;
  codigo += `26${chavePixFormatada.length.toString().padStart(2, '0')}${chavePixFormatada}`;
  
  // Merchant Category Code
  codigo += '52040000';
  
  // Transaction Currency (BRL)
  codigo += '5303986';
  
  // Transaction Amount
  if (valor && valor > 0) {
    const valorStr = valor.toFixed(2);
    codigo += `54${valorStr.length.toString().padStart(2, '0')}${valorStr}`;
  }
  
  // Country Code
  codigo += '5802BR';
  
  // Merchant Name
  const nomeFormatado = merchantName.substring(0, 25);
  codigo += `59${nomeFormatado.length.toString().padStart(2, '0')}${nomeFormatado}`;
  
  // Merchant City
  const cidadeFormatada = merchantCity.substring(0, 15);
  codigo += `60${cidadeFormatada.length.toString().padStart(2, '0')}${cidadeFormatada}`;
  
  // Additional Data Field Template
  if (descricao) {
    const descricaoFormatada = descricao.substring(0, 72);
    const additionalData = `0503***`;
    codigo += `62${additionalData.length.toString().padStart(2, '0')}${additionalData}`;
  }
  
  // CRC16 (simplificado)
  codigo += '6304';
  
  return codigo;
};

// Gerar código PIX com QR Code
exports.gerarPix = async (req, res) => {
  try {
    const { valor, descricao, chavePix } = req.body;

    // Validações
    if (!valor || valor <= 0) {
      return res.status(400).json({ message: 'Valor deve ser maior que zero' });
    }

    if (!chavePix) {
      return res.status(400).json({ message: 'Chave PIX é obrigatória' });
    }

    // Dados do PIX
    const dadosPix = {
      chavePix: chavePix.trim(),
      valor: parseFloat(valor),
      merchantName: process.env.PIX_MERCHANT_NAME || 'FETIN Marketplace',
      merchantCity: process.env.PIX_MERCHANT_CITY || 'Santa Rita do Sapucai',
      descricao: descricao || 'Pagamento FETIN'
    };

    // Gerar código PIX
    const codigoPix = gerarCodigoPix(dadosPix);

    // Gerar QR Code
    const qrCodeDataURL = await QRCode.toDataURL(codigoPix, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // ID da transação
    const transacaoId = Date.now().toString();

    res.status(200).json({
      transacaoId,
      codigoPix,
      qrCode: qrCodeDataURL,
      valor: parseFloat(valor),
      descricao: dadosPix.descricao,
      chavePix: dadosPix.chavePix,
      merchantName: dadosPix.merchantName,
      merchantCity: dadosPix.merchantCity,
      status: 'pendente',
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor',
      error: error.message 
    });
  }
};

// Verificar status do pagamento PIX
exports.verificarStatus = async (req, res) => {
  try {
    const { transacaoId } = req.params;
    
    // Simulação - em produção consultaria PSP/banco
    const statusSimulado = Math.random() > 0.7 ? 'pago' : 'pendente';
    
    res.status(200).json({
      transacaoId,
      status: statusSimulado,
      dataPagamento: statusSimulado === 'pago' ? new Date().toISOString() : null,
      message: statusSimulado === 'pago' ? 'Pagamento confirmado' : 'Aguardando pagamento'
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao verificar status',
      error: error.message 
    });
  }
};

// Listar transações PIX do usuário
exports.listarTransacoes = async (req, res) => {
  try {
    // Em produção, buscaria do banco de dados
    res.status(200).json({
      transacoes: [],
      message: 'Funcionalidade em desenvolvimento'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao listar transações',
      error: error.message 
    });
  }
};