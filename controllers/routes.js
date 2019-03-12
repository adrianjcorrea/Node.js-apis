const helper = require('../config/helperFunctions.js');
const UserModel = require('../models/userModel.js');
// Mock dataBase
//const users = {}
  // I will be incrementing max users Id as i add a user.
//let max_user_id = 0;

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

    //Added the find method functionality from mongoose on get request.
    UserModel.find({}, function(err, users){
        //return next();
   helper.success(res, next, users);
    })
      
  });

  //Api call get user by id.
  server.get("/users/:id", function(req, res, next){
      req.assert('id', 'Id is required and must be numeric').notEmpty();
      var errors = req.validationErrors();
     if(errors){ 
         helper.failure(res, next, errors[0], 404);
     }

     //Added the find method functionality from mongoose on get request.
    UserModel.find({ _id: req.params.id}, function(err, user){
      //return next();
      user === null 
      ? helper.failure(res, next, 'This user could not be found', 404)
      : helper.success(res, next, user);
    });
      // Ternirary operator conditonals to return error if user not found.
    //typeof(users[req.params.id]) === 'undefined' 
    //? helper.failure(res, next, 'This user dosent exist', 404).next()
         //res.setHeader('content-type', 'application/json');
         //res.writeHead(200);
      // Return a response unique user depending on id.
        //res.end(JSON.stringify(users[parseInt(req.params.id)]));
        //return next();
   // : helper.success(res, next, users[parseInt(req.params.id)]);
  });
  
  // Adding users using post requests
  server.post("/users", function(req, res, next){
     //If the first parameter of assert fn is not passed in errors & failure fn will run.
   req.assert('first_name', 'First name is required').notEmpty();
   req.assert('last_name', 'Last name is required').notEmpty();
   //If is not email or empty return error & failure fn.
   req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
   //If value is not equal to student/teacher or professor or empty return error & failure fn.
   req.assert('career', 'Career must be either student, teacher, or professor').isIn(['student','teacher','professor']);
   var errors = req.validationErrors();
   if (errors) {
      helper.failure(res, next, errors, 400);
      return next();
   }
    // Parameters coming in will define our new user.
    let user = new UserModel();
    // Increment our max_user_id and set max_user_id as the user id.
    //max_user_id++;
    //user.id = max_user_id;
    //users[user.id] = user;
        //res.setHeader('content-type', 'application/json');
        //res.writeHead(200);
        //res.end(JSON.stringify(user));
        //return next();
    //helper.success(res, next, user);

    // Configured funtionality for creating a user on MLAB.
    user.first_name = req.params.first_name;
    user.last_name = req.params.last_name;
    user.email_address = req.params.email_address;
    user.career = req.params.career;
    user.save(function(err){
       err ?
       helper.failure(res, next, 'Error serving user to database', 500)
       : helper.success(res, next, user);

    });
  });
  
  //Update a user using put request.
  server.put("/users/:id", function(req, res, next){
    let user = users[parseInt(req.params.id)];
    // Create variable containing the data we are going to insert.
    let updates = req.params;
    // Id has to be a number and not null to return success.
    req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helper.failure(res, next, errors[0], 400);
			return next();
		}
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
      // Id has to be a number and not null to return success.
   req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helper.failure(res, next, errors[0], 400);
			return next();
		} 
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