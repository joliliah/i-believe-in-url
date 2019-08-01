const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/hits', require('./routes/hits'));
app.use('/', require('./routes/urls'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
