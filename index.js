const restify = require('restify');
const server = restify.createServer();
const setControllers = require('./controllers/setupControllers.js');
const routes = require('./controllers/routes.js');

setControllers(restify, server);
routes(server);
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});