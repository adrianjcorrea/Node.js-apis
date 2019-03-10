const restify = require('restify');
const server = restify.createServer();

// Mock dataBase
const users = {
 name: 'adrian',
 best: 'football'
}
// I will be incrementing max users Id as i add a user.
let max_user_id = 1;
// Function lets us use plugin bodyParser to post a user.
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());

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
// Adding users using post requests
server.post("/users", function(req, res, next){
  // Parameters coming in will define our new user.
  let user = req.params;
  // Increment our max_user_id and set max_user_id as the user id.
  max_user_id++;
  user.id = max_user_id;
  users[user.id] = user;
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(user));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
