const restify = require('restify');
const server = restify.createServer();

// Mock dataBase
const users = {}
// I will be incrementing max users Id as i add a user.
let max_user_id = 0;
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
//Api call get user by id.
server.get("/user/:id", function(req, res, next){
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  // Return a response unique user depending on id.
  res.end(JSON.stringify(users[parseInt(req.params.id)]));
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

//Update a user using put request.
server.put("/users/:id", function(req, res, next){
  // Create a variable to call the user with perticular id.
  let user = users[parseInt(req.params.id)];
  // Create variable containing the data we are going to insert.
  let updates = req.params;
  //use a for loop to iterate thru our array of new parameters.
  for(var i in updates){
    user[i] = updates[i];
  }
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  //update the specific user indexes
  res.end(JSON.stringify(user[i]));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
