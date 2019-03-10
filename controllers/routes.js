const helper = require('../config/helperFunctions.js');

// Mock dataBase
const users = {}
// I will be incrementing max users Id as i add a user.
let max_user_id = 0;

module.exports = function(server){
// Api call Get request.
server.get("/", function(req, res, next){
    // Our response will be json format.
       //res.setHeader('content-type', 'application/json');
    // Set response header to the request
       //res.writeHead(200);
    // Return a response users object as a string.
       //res.end(JSON.stringify(users));
    // Ensure the Ends of our req-res cycle.
       //return next();
   helper.success(res, next, users);
  });
  //Api call get user by id.
  server.get("/users/:id", function(req, res, next){
    // Ternirary operator conditonals to return error if user not found.
    typeof(users[req.params.id]) === 'undefined' 
    ? helper.failure(res, next, 'This user dosent exist', 404)
       //res.setHeader('content-type', 'application/json');
       //res.writeHead(200);
    // Return a response unique user depending on id.
      //res.end(JSON.stringify(users[parseInt(req.params.id)]));
      //return next();
  : helper.success(res, next, users[parseInt(req.params.id)]);
  
  });
  
  // Adding users using post requests
  server.post("/users", function(req, res, next){
    // Parameters coming in will define our new user.
    let user = req.params;
    // Increment our max_user_id and set max_user_id as the user id.
    max_user_id++;
    user.id = max_user_id;
    users[user.id] = user;
       //res.setHeader('content-type', 'application/json');
       //res.writeHead(200);
       //res.end(JSON.stringify(user));
       //return next();
    helper.success(res, next, user)
  });
  
  //Update a user using put request.
  server.put("/users/:id", function(req, res, next){
    let user = users[parseInt(req.params.id)];
    // Create variable containing the data we are going to insert.
    let updates = req.params;
    //use a for loop to iterate thru our array of new parameters.
    for(var i in updates){
      user[i] = updates[i];
    }
       //res.setHeader('content-type', 'application/json');
       //res.writeHead(200);
    //update the specific user indexes
       //res.end(JSON.stringify(user[i]));
       //return next();
    typeof(users[req.params.id]) === 'undefined' 
    ? helper.failure(res, next, 'This user dosent exist', 404)
    // Create a variable to call the user with perticular id.
    : 
    helper.success(res, next, user);
  });
  
  server.del( "/users/:id", function(req, res, next){
    typeof(users[req.params.id]) === 'undefined' 
    ? helper.failure(res, next, 'This user dosent exist', 404)
    : delete users[parseInt(req.params.id)];
       //res.setHeader('content-type' ,'application/json');
       //res.writeHeader(200);
       //res.end(JSON.stringify(true));
       //return next();
    helper.success(res, next, []);   
  });
  
};