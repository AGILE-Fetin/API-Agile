const mongoose = require('mongoose');

const PedidoItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: String,
  number: String,
  complement: String,
  neighborhood: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [PedidoItemSchema], required: true },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['Pendente', 'Aprovado', 'Cancelado', 'Entregue'], 
    default: 'Pendente' 
  },
  paymentMethod: { type: String },
  deliveryAddress: AddressSchema,
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
