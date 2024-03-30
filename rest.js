const express = require('express');
const authRouter= require('./routers/authRouter')
const userRouter= require('./routers/userRouter')


module.exports = function(app) {
    // app.use('/api/auth', authRouter);
    app.use ('/api/user', userRouter);
    // app.get('/*', express.static(`./build`));    
}