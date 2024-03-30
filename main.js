//initialize a simple http server
const express = require('express');
const app = express();

app.use(express.json());

//redirect each rest requests to rest file
require('./rest')(app);

const db = require('./database/db');

const PORT = 9090;

const start = async() => {
    try {
        db.connect( (error) => { 
            if(error)
                throw error;
            
            console.log("Database connected"); 
        });
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
}

start();