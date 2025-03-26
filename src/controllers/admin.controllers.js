import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const admin = await Admin.findById(userId);

        if (!admin) {
            throw new Error("User not found");
        }

        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false }); // Save the refreshToken to the database
        return { accessToken, refreshToken };

    } catch (error) {
        throw new Error(error.message || "Error in generating tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { username, StaffId,  email, fullname, password} = req.body;

    console.log(username, StaffId,  email, fullname, password)
    if ([fullname, email, username, password, StaffId].some((field) => !field?.trim())) {
        res.status(400);
        throw new Error("All fields are required");
    }


    const existedUser = await Admin.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        res.status(409);
        throw new Error("User with email or username already exists");
    }



    const user = await Admin.create({
        username,
        email,
        StaffId,
        password,
        fullname,

    });

    if (!user) {
        res.status(500);
        throw new Error("Something went wrong while registering the user");
    }
    


    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
        }
    });
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }




    const userExist = await Admin.findOne({ email });
    if (!userExist) {
        res.status(404);
        throw new Error("User with this email does not exist");
    }



    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }




    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(userExist._id);
    const optionals = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }
    res.status(200).cookie("accessToken", accessToken, optionals).cookie("refreshToken", refreshToken, optionals).cookie("email", email, optionals).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            fullname: userExist.fullname,
            Identity : "Admin"
           
        }
    });
});


const logout = asyncHandler(async (req, res) => {
    console.log(req)
    console.log(req.user)
    await Admin.findByIdAndUpdate(
        req.user,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .clearCookie("user", options)
        .json("User Logged out successfully")
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingrefreshtoken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingrefreshtoken) {
        res.status(400);
        throw new Error("Unauthorized Request");
    }

    try {
        const decode = jwt.verify(
            incomingrefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await Admin.findById(decode?._id);

        if (!user) {
            res.status(400);
            throw new Error("Invalid Refresh Token");
        }

        if (incomingrefreshtoken !== user.refreshToken) {
            res.status(400);
            throw new Error("Refresh Token expired");
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        const { accesstoken, refreshtoken } = await generateAccessAndRefereshTokens(user._id);

        return res
        .status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshtoken, options)
        .json({ message: "Token sent successfully..!!" });


    } catch (error) {
        res.status(401);
        throw new Error("Invalid or expired refresh token");
    }
});


export { registerUser, loginUser,  logout, refreshAccessToken}