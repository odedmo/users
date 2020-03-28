const mongoose = require('mongoose');

const initDb = (config) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.connectionString, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }).then(() => {
      console.log('Db connected');
      resolve();
    })
    .catch(err => {
      console.log('Db connection faild', err);
      reject();
    });
  });
  
}

module.exports = initDb;