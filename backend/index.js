const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 3050;

app.use(
  bodyParser.json({
    limit: '1mb'
  })
);
app.use('/', routes);

app.listen(port, () => console.log(`Server starting on ${port}`));
