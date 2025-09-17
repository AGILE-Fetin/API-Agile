// Validações básicas
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const mongoose = require('mongoose');

const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const sanitizeString = (str, maxLength = 1000) => {
  if (typeof str !== 'string') return '';
  return str.trim().substring(0, maxLength);
};

// Middleware de validação para registro
const validateRegister = (req, res, next) => {
  const { email, password, fullName } = req.body;
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
  }
  
  if (!fullName || fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Nome completo é obrigatório' });
  }
  
  // Sanitizar dados
  req.body.email = sanitizeString(email, 100).toLowerCase();
  req.body.fullName = sanitizeString(fullName, 100);
  
  next();
};

// Middleware de validação para login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  
  if (!password) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }
  
  req.body.email = sanitizeString(email, 100).toLowerCase();
  
  next();
};

// Middleware de validação para ObjectId
const validateObjectIdParam = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!validateObjectId(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    next();
  };
};

module.exports = {
  validateRegister,
  validateLogin,
  validateObjectIdParam,
  sanitizeString,
  validateEmail,
  validatePassword
};