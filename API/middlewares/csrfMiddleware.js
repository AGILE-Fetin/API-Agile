const crypto = require('crypto');

// Armazenamento em memória para tokens CSRF (em produção, use Redis ou banco)
const csrfTokens = new Map();

// Gerar token CSRF
const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware para gerar e validar CSRF
const csrfProtection = {
  // Gerar token CSRF
  generateToken: (req, res, next) => {
    const token = generateCSRFToken();
    const sessionId = req.sessionID || req.ip + req.get('User-Agent');
    
    csrfTokens.set(sessionId, token);
    
    // Limpar tokens antigos (cleanup simples)
    if (csrfTokens.size > 1000) {
      const firstKey = csrfTokens.keys().next().value;
      csrfTokens.delete(firstKey);
    }
    
    req.csrfToken = token;
    res.locals.csrfToken = token;
    next();
  },

  // Validar token CSRF
  validateToken: (req, res, next) => {
    // Pular validação durante testes
    if (process.env.NODE_ENV === 'test') {
      return next();
    }
    
    // Pular validação para métodos seguros
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    const sessionId = req.sessionID || req.ip + req.get('User-Agent');
    const clientToken = req.headers['x-csrf-token'] || req.body._csrf;
    const storedToken = csrfTokens.get(sessionId);

    if (!clientToken || !storedToken || clientToken !== storedToken) {
      return res.status(403).json({ 
        error: 'Token CSRF inválido ou ausente',
        code: 'CSRF_TOKEN_INVALID'
      });
    }

    next();
  },

  // Endpoint para obter token CSRF
  getToken: (req, res) => {
    const token = generateCSRFToken();
    const sessionId = req.sessionID || req.ip + req.get('User-Agent');
    
    csrfTokens.set(sessionId, token);
    
    res.json({ csrfToken: token });
  }
};

module.exports = csrfProtection;