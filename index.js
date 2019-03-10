const restify = require('restify');
const server = restify.createServer();

// Mock dataBase
const users = {
 name: 'adrian',
 best: 'football'
}
// I will be incrementing max users Id as i add a user.
let max_users_id = 0;

// Api call Get request.
server.get("/", function(req, res, next){
  // Our response will be json format.
  res.setHeader('content-type', 'application/json');
  // Set response header to the request
  res.writeHead(200);
  // Return a response users object as a string.
  res.end(JSON.stringify(users));
  // Ensure the Ends of our req-res cycle.
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
