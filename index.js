const restify = require('restify');
const server = restify.createServer();

const users = {

}
let max_users_id = 0;

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
