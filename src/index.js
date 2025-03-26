import mongoose from "mongoose";
import { DB_NAME } from './constants.js';
import {app} from './app.js'
import cors from "cors"
import cookieParser from "cookie-parser"

import dotenv from 'dotenv';  // Use ES module import for dotenv
dotenv.config({
   path : './env'
});  // Load environment variables from .env

// import express from 'express';
// const app = express();

import connectDB from "./db/db.js";

 


connectDB()
.then(() => {     // why this? because when a asynchronous method gets over it returns a promise
   app.listen(process.env.PORT, () => {
      console.log("Server is running on port : " + process.env.PORT)
   })
})
.catch((error) => {
   console.log("Connection Failed ..!!", error)
})  





















// ;(async () => {       // IIFES (Immediately Invoked Function Expression)
//    try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//       console.log(`Connected to MongoDB Database: ${DB_NAME}`);
//       app.on("error", (error) => {
//          console.log("ERROR: ", error);
//          throw error;
//       });

//       // Start the Express app on the defined PORT
//       app.listen(process.env.PORT, () => {
//          console.log(`App listening on PORT ${process.env.PORT}`);
//       });
//    } catch (err) {
//       console.log("Error", err);
//       throw err;
//    }
// })();