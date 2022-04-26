const express = require('express');

const router = require('./router/index.js');

const app = express();

app.use('/api', router);

app.listen(4000);
