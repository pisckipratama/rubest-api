const mongoose = require('mongoose');

const CashflowSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Please enter an item name.']
  },
  total: {
    type: Number,
    required: [true, 'Please enter total spending']
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cashflow', CashflowSchema);