const restify = require('restify');
const restifyValidator = require('restify-validator')
const server = restify.createServer();
const setControllers = require('./controllers/setupControllers.js');
const routes = require('./controllers/routes.js');
const mongoose = require('mongoose');
const config = require('./config/dbConnections.js');


mongoose.connect(config.getMongoConnetion())
setControllers(restify, server, restifyValidator);
routes(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});