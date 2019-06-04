const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const fallback = require('express-history-api-fallback');
const port = process.env.PORT || 3050;

app.use(
  bodyParser.json({
    limit: '1mb'
  })
);
const root = __dirname + '/build';
app.use('/', routes);
app.use(express.static(root));
app.use(fallback('index.html', {root}));

app.listen(port, () => console.log(`Server starting on ${port}`));
