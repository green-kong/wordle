const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const passportConfig = require('./util/passport/index.js');
const router = require('./router/index.js');

const app = express();

const corsOpt = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOpt));
app.use(passport.initialize());

passportConfig();

app.use('/api', router);

app.listen(process.env.PORT || 4000);
