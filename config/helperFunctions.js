// Code destructuring using helper functions.
function _response(res, next, status, data, http_code){
    //Definin my default parameters.
    const response = {
      'status': status,
      'data': data
    };
     res.setHeader('content-type' ,'application/json');
     res.writeHeader(http_code);
     res.end(JSON.stringify(response));
     return next();
   };
   
   module.exports.success = function(res, next, data){
   // When I call my function only need to set 3 params for the ather to are set.
      _response(res, next, 'success', data, 200);
   };
   
   module.exports.failure = function(res, next, data, http_code){
     _response(res, next, 'failure', data, http_code);
   };