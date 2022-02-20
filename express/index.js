const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const router = require('./routes/api/users');

const app = express();

// init middleware
// app.use(logger);

// body parser middleware - use for post data
app.use(express.json());
// If extended is false, you can not post "nested object"
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', router);

// process.env - to have an access during deploying
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`serve started on port ${PORT}`));
