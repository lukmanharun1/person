const express = require('express')
require('dotenv').config();
const app = express();
const routes = require('./routes/index');
app.use(express.json());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Person listening at http://localhost:${port}`)
  })
module.exports = app;

