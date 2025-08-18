// Rate limiting simples em memória
const rateLimitStore = new Map();

const rateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutos
    max = 100, // máximo de requests
    message = 'Muitas tentativas. Tente novamente mais tarde.',
    skipSuccessfulRequests = false
  } = options;

  return (req, res, next) => {
    const key = req.ip + req.path;
    const now = Date.now();
    
    // Limpar entradas antigas
    for (const [k, v] of rateLimitStore.entries()) {
      if (now - v.resetTime > windowMs) {
        rateLimitStore.delete(k);
      }
    }
    
    let record = rateLimitStore.get(key);
    
    if (!record) {
      record = {
        count: 0,
        resetTime: now
      };
      rateLimitStore.set(key, record);
    }
    
    // Reset se passou da janela de tempo
    if (now - record.resetTime > windowMs) {
      record.count = 0;
      record.resetTime = now;
    }
    
    record.count++;
    
    // Headers informativos
    res.set({
      'X-RateLimit-Limit': max,
      'X-RateLimit-Remaining': Math.max(0, max - record.count),
      'X-RateLimit-Reset': new Date(record.resetTime + windowMs)
    });
    
    if (record.count > max) {
      return res.status(429).json({ error: message });
    }
    
    next();
  };
};

// Rate limits específicos
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas de login
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
});

const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

module.exports = { rateLimit, authRateLimit, generalRateLimit };