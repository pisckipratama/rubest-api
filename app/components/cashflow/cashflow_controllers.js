const asyncHandler = require('../../lib/middlewares/asyncHandler');
const Cash = require('./cashflow_models');
const User = require('../auth/auth_models');
const ErrorHandler = require('../../lib/helpers/errorResponse');

exports.getCashes = asyncHandler(async (req, res, next) => {
  let { date, size, page } = req.query;

  let total = await Cash.aggregate([
    {
      '$group': {
        '_id': null,
        'total': {
          '$sum': '$amount'
        }
      }
    }
  ]);

  
  let cashes = await Cash.find();
  if (date) {
    cashes = await Cash.find({ date });
    total = await Cash.aggregate([
      {
        '$match': {
          'date': date
        }
      }, {
        '$group': {
          '_id': null, 
          'total': {
            '$sum': '$amount'
          }
        }
      }
    ])
  }
  
  total = total[0].total;
  res.status(200).json({
    success: true,
    content: cashes,
    total
  });
});

exports.getCashById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const cash = await Cash.findById(id);
  if (!cash) return next(new ErrorHandler(`Resource not found`, 404));

  res.status(200).json({
    success: true,
    content: cash
  });
});

exports.addCash = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler(`Unauthorize user`, 400));

  const cash = await Cash.create(req.body);
  res.status(201).json({ success: true, message: 'cashflow has been recorded', content: cash });
});

exports.updateCash = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler(`Unauthorize user`, 400));

  let cash = await Cash.findById(id);

  if (!cash) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));

  cash = await Cash.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });


  res.status(200).json({ success: true, message: `update cashflow ${req.params.id} success`, content: cash });
});

exports.deleteCash = asyncHandler(async (req, res, next) => {
  const cash = await Cash.findById(req.params.id);

  if (!cash) return next(new ErrorHandler(`Resource not found with Objectid of ${req.params.id}`, 404));

  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler(`Unauthorize user`, 400));

  cash.remove();
  res.json({ success: true, message: `delete cashflow ${req.params.id} success`, content: {} });
});