import {Router} from "express"

import {registerUser, loginUser,logout} from "../controllers/trainer.controller.js"

import express from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { get } from "mongoose"

const app = express()
const router = Router()
app.use(express.json())


router.route("/trainerRegistration").post(
    registerUser
)




router.route("/trainerlogin").post(
    loginUser
)




router.route("/trainerlogout").post(
    logout
)




app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

export default router