import * as express from "express"
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { myDataSource } from "./database/app-data-source"

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

//initialize the rest file
import { setupRoutes } from './rest';
setupRoutes(app);

const PORT = 9090;
try {    
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
} catch (error) {
    console.log(error);
}

export = app
