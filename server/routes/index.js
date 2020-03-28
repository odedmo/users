const path = require('path');
const glob = require('glob');

module.exports = (app) => {
  const routes = glob.sync(path.join(__dirname, '/v1/*.js'));
  routes.forEach(route => {
    console.log('route:::', route);
    require(route)(app);
  });
}
