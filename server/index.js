const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const PORT = 4500;
const route = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, PUT, DELETE',
  );
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/', route);

app.get('/', (req, res) => {
  res.send('hello javascript tools server');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
