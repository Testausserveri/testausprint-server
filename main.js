const server = require('./src/xmpp-server');
const apiServer = require('./src/api-server');

server.startServer().then(server => {
    console.log("server started");
    apiServer.startServer(5554);
});