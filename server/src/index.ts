import express from "express";

import router from "./router/router";

import mongoose from "mongoose";

import cors from "cors";

import errormidlwears from "./midlewears/error-midllewears"

require("dotenv").config()

const URI = process.env.URI_KEY;

const app = express();

app.use(cors())

app.use(express.json())

app.use("/api",router);

app.use(errormidlwears);

const ServerStart = async ():Promise<void> => {
    
    await mongoose.connect(URI)
    
    app.listen(process.env.PORT, () => {
        console.log(`Server was started in ${process.env.PORT}...`);
    });

};

ServerStart();