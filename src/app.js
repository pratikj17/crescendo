import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

const allowedOrigins = ["https://cresendo-frontend-nine.vercel.app", "http://localhost:5173"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // ✅ Return true if origin is allowed
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

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

import adminRouter from "./routes/admin.routes.js"
app.use("/api/v1/admin", adminRouter)

import trainerRouter from "./routes/trainer.routes.js"

app.use("/api/v1/trainer", trainerRouter)

 import usersRouter from "./routes/student.routes.js"

 app.use("/api/v1/student", usersRouter)

 import fileRouter from "./routes/file.routes.js";
 app.use('/api/v1/files',fileRouter);

// // routes import

// import userRouter from './routes/user.route.js'

// // routes declaration 

// app.use("/api/v1/users", userRouter)
 


export {app};