const mongoose = require('mongoose');

// Cria um novo ObjectId
const novoId = new mongoose.Types.ObjectId();

console.log(novoId.toString()); // ex: '64c2b8e3f3a3a7a123456789'
