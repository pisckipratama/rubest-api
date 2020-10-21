const mongoose = require('mongoose');

const CashflowSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Please enter an item name.']
  },
  amount: {
    type: Number,
    required: [true, 'Please enter amount spending']
  },
  date: {
    type: String,
    required: [true, 'Please enter date spending']
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cashflow', CashflowSchema);