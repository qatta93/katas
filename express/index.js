const express = require('express');
const path = require('path');
const moment = require('moment');
const users = require('./Users');

const app = express();

// every time there is a req, logger will run
const logger = (req, res, next) => {
  console.log(req);
  next();
}

// init middleware
app.use(logger);

app.get('/api/users', (__, res) => res.json(users)); 

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// process.env - to have an access during deploying
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`serve started on port ${PORT}`));
