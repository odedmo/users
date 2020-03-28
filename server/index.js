require('dotenv').config()
const express = require('express');
const app = express();

const setMiddlewares = require('./middlewares');
const setRoutes = require('./routes');
const initDb = require('./DAL/db');


setMiddlewares(app);
setRoutes(app);


const port = process.env.PORT || 8080;

initDb({
  connectionString: process.env.CONNECTION_STRING || 'mongodb://oded:password1@ds115523.mlab.com:15523/users',
}).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})
.catch(err => {
  console.log(err);
});
