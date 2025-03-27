import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileRouter from "./routes/file.routes.js";


const app = express();

const allowedOrigins = ["https://glitched.gamedevutopia.in", "https://gdu-feb25-event-be.onrender.com", "http://localhost:3000","http://localhost:5174"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, 
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use(cookieParser());


app.options("*", (req, res) => {
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    
    res.sendStatus(204);
});


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

import adminRouter from "./routes/admin.routes.js"

app.use("/api/v1/student", adminRouter)

import trainerRouter from "./routes/trainer.routes.js"

app.use("/api/v1/student", trainerRouter)

 import usersRouter from "./routes/student.routes.js"

 app.use("/api/v1/student", usersRouter)

 app.use('/api/v1/files',fileRouter);

// // routes import

// import userRouter from './routes/user.route.js'

// // routes declaration 

// app.use("/api/v1/users", userRouter)
 


export {app};