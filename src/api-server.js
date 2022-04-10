const express = require('express');
const {registerPrinter} = require('./apipaths/printer/register');

const startServer = (port) => {
    const app = express();
    app.use(express.json());
    app.post('register', registerPrinter);
    app.listen(port);
}

module.exports = {
    startServer
}