import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

dotenv.config({ path: __dirname + '/.env' });

import { myDataSource } from "./database/app-data-source"


const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:5173"
  };


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
app.use(cors(corsOptions));
app.use(express.json())
// app.options('*',cors(corsOptions))

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
