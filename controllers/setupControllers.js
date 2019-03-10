module.exports = function(restify, server){
    // Function lets us use plugin bodyParser to post a user.
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.bodyParser());
  
}