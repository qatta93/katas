const moment = require('moment');

// every time there is a req, logger will run
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}: ${moment().format()}`);
  next();
}

module.exports = logger;