const mongoose = require('mongoose');

const PedidoItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'items.productModel'
  },
  productModel: {
    type: String,
    enum: ['Automovel', 'Imovel', 'Servico', 'Prestador']
  },
  quantity: Number,
  price: Number
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  street: String,
  number: String,
  complement: String,
  neighborhood: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [PedidoItemSchema],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Pendente', 'Aprovado', 'Cancelado', 'Entregue'],
    default: 'Pendente'
  },
  paymentMethod: String,
  deliveryAddress: AddressSchema,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);
