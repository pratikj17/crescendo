import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
import { Trainer } from "../models/trainer.model.js";
import { Student } from "../models/student.model.js";

dotenv.config();

export const verifyJWT = (allowedRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        try {
            let token = req.cookies?.accessToken;
            if (token?.startsWith("Bearer ")) {
                token = token.replace("Bearer ", "");
            }

            if (!token) {
                return res.status(401).json({ message: "No token provided. Unauthorized access." });
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
            
            let user = await Admin.findById(decoded._id).select("-password -refreshToken") ||
                       await Trainer.findById(decoded._id).select("-password -refreshToken") ||
                       await Student.findById(decoded._id).select("-password -refreshToken");

            if (!user) {
                return res.status(401).json({ message: "Unauthorized Request" });
            }

           
            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Invalid access token" });
        }
    });
};
