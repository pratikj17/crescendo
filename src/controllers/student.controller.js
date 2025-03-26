import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await Student.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // Save the refreshToken to the database
        return { accessToken, refreshToken };

    } catch (error) {
        throw new Error(error.message || "Error in generating tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { 
        username, 
        RollNo, 
        Batch, 
        email, 
        fullname, 
        dob, 
        Number,      
        Fname,       
        Fnumber,     
        Fmail,       
        Mname,      
        Mnumber,    
        resume,      
        password 
    } = req.body;

  
    if ([username, RollNo, email, fullname, dob, Fname, Fnumber, Mname, Mnumber, password].some(field => !field?.toString().trim())) {
        res.status(400);
        throw new Error("All required fields must be provided");
    }

   
    if (resume && !resume.toLowerCase().endsWith('.pdf')) {
        res.status(400);
        throw new Error("Resume must be a PDF file");
    }

    
    const existedUser = await Student.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        res.status(409);
        throw new Error("User with email or username already exists");
    }

    const user = await Student.create({
        username,
        RollNo,
        Batch,       
        email,
        fullname,
        dob,
        Number,
        Fname,
        Fnumber,
        Fmail,
        Mname,
        Mnumber,
        resume,
        password
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
            resume: user.resume
        }
    });
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }




    const userExist = await Student.findOne({ email });
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
    res.status(200).cookie("accessToken", accessToken, optionals).cookie("refreshToken", refreshToken, optionals).cookie("email", email, optionals).cookie("Identity" , "student", optionals).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            fullname: userExist.fullname,
            Identity : "student"
           
        }
    });
});


const logout = asyncHandler(async (req, res) => {
    console.log(req)
    console.log(req.user)
    await Student.findByIdAndUpdate(
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

        const user = await Student.findById(decode?._id);

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



const getStudentProfileByUsername = asyncHandler(async (req, res) => {
   
    const { username } = req.query;
 

    const student = await Student.findOne({ username: username });

    if (!student) {
        res.status(404);
        throw new Error("Student not found");
    }


    res.status(200).json({
        student: {
            id: student._id,
            username: student.username,
            RollNo: student.RollNo,
            Batch: student.Batch,
            email: student.email,
            fullname: student.fullname,
            dob: student.dob,
            Number: student.Number,
            Fname: student.Fname,
            Fnumber: student.Fnumber,
            Fmail: student.Fmail,
            Mname: student.Mname,
            Mnumber: student.Mnumber,
            resume: student.resume,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt
        }
    });
});



export { registerUser, loginUser,  logout, refreshAccessToken, getStudentProfileByUsername}



