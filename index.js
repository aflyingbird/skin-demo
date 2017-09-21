var server = require('./server/server');
var router = require('./router/router');
 
server.start(router.route);
