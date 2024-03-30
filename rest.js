const express = require('express');
const authRouter= require('./routers/authRouter')
const testRouter= require('./routers/testRouter')


module.exports = function(app) {
    // app.use('/api/auth', authRouter);
    app.use ('/api/test',testRouter);
    // app.get('/*', express.static(`./build`));    
}