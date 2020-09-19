const logger = (req, _, next) => {
  console.log(
    `${req.method} \t ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
