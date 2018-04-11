const express = require('express');
const path = require('path');
const apiRoutes = require('./core/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = require('./config').serverPort;
const app = express();


app.use(bodyParser.json({
  strict: false,
}));
app.use(cors());

app.use(apiRoutes);
app.use((err, req, res) => {
  res.send({
    ok: false,
    error: 'Unexpected server error',
  });
})

app.listen(port);
console.log(`Serving at http://localhost:${port}`);