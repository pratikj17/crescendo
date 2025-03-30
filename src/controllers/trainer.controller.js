import { asyncHandler } from "../utils/asyncHandler.js";
import { Trainer } from "../models/trainer.model.js";
import { Student } from "../models/student.model.js";
import { Assignments } from "../models/assignments.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const trainer = await Trainer.findById(userId);

        if (!trainer) {
            throw new Error("User not found");
        }

        const accessToken = trainer.generateAccessToken();
        const refreshToken = trainer.generateRefreshToken();

        trainer.refreshToken = refreshToken;
        await trainer.save({ validateBeforeSave: false }); // Save the refreshToken to the database
        return { accessToken, refreshToken };

    } catch (error) {
        throw new Error(error.message || "Error in generating tokens");
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { username, StaffId, Batches,  email, fullname, password} = req.body;

    console.log(username, StaffId, Batches,  email, fullname, password)
    if ([fullname, email, username, password, StaffId].some((field) => !field?.trim())) {
        res.status(400);
        throw new Error("All fields are required");
    }


    const existedUser = await Trainer.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        res.status(409);
        throw new Error("User with email or username already exists");
    }



    const user = await Trainer.create({
        username,
        email,
        Batches,
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




    const userExist = await Trainer.findOne({ email });
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
    res.status(200).cookie("accessToken", accessToken, optionals).cookie("refreshToken", refreshToken, optionals).cookie("email", email, optionals).cookie("Identity" , "trainer", optionals).json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email,
            fullname: userExist.fullname,
            Identity : "trainer"
           
        }
    });
});


const logout = asyncHandler(async (req, res) => {
    console.log(req)
    console.log(req.user)
    await Trainer.findByIdAndUpdate(
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

        const user = await Trainer.findById(decode?._id);

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

const getBatches = asyncHandler(async (req, res) => {
    const teacher = req.query.username;

    if (!teacher) {
        res.status(401);
        throw new Error("Please provide the teacher username");
    }

    const batchData = await Trainer.aggregate([
        { $match: { username: teacher } },
        { $project: { batches: 1, _id: 0 } },
    ]);


    if (!batchData.length || !batchData[0].batches) {
        return res.status(200).json([]);
    }

    let batches = batchData[0].batches;

   console.log(batches)
    // if (typeof batches === "string") {
    //     try {
    //         batches = JSON.parse(batches); 
    //     } catch (error) {
    //         return res.status(500).json({ error: "Invalid batch format in database" });
    //     }
    // }

    return res.status(200).json(batches);
});

const getAbatch = asyncHandler(async (req, res) => {
    const batch = req.query.batch;
    console.log(batch)
    if(!batch){
        res.status(404);
        throw new Error("Batch not selected");
    }

    const student = await Student.aggregate([
        {
            $match: { Batch: batch },
        },
        {
            $project: { fullname : 1, _id: 1, username : 1, RollNo : 1}, 
        },
    ]);
    if(student.length === 0){
        res.status(404);
        throw new Error("No students found for this batch");
    }
    res.status(200).json(student);
})


const getUploadedAssignments = asyncHandler(async (req, res) => {
    const batch = req.params.batch;
    console.log(batch);
    
    if (!batch) {
        res.status(400); // 400 is better for "Bad Request"
        throw new Error("Batch not selected");
    }

    const assignments = await Assignments.find({ batch }); // ✅ Use "await"

    if (assignments.length === 0) {
        res.status(404);
        throw new Error("No uploaded assignment found for this batch");
    }

    console.log(assignments);
    res.status(200).json(assignments); // ✅ Return the actual assignments
});


const addStudent = asyncHandler(async (req, res) => {
    const {fullname} = req.body;
    const batch = req.query.batch;

    if(!fullname){
        res.status(404);
        throw new Error("No student provided");
    }
    
    const user = await Student.findOne({ fullname });

   
    if (!user) {
        res.status(404);
        throw new Error("Student not found");
    }

    user.Batch = batch;

    const updatedStudent = await user.save();

    res.status(200).json({
        success: true,
        message: "Batch updated successfully",
        student: updatedStudent
    });

})


const submittedornot = asyncHandler(async (req, res) => {
    const { assignment, batch } = req.query;

    if (!assignment || !batch) {
        return res.status(400).json({ success: false, message: "Assignment and batch are required" });
    }

    const students = await Student.find({ Batch: batch }, { fullname: 1, _id: 1, username: 1, RollNo: 1 });

    if (!students.length) {
        return res.status(404).json({ success: false, message: "No students found in this batch" });
    }

    const submittedAssignments = await Assignments.find({ assignment }, { studentIds: 1 });

    const submittedStudentIds = new Set(submittedAssignments.flatMap(a => a.studentIds));

    const submitted = [];
    const notSubmitted = [];

    students.forEach(student => {
        if (submittedStudentIds.has(student._id.toString())) {
            submitted.push(student);
        } else {
            notSubmitted.push(student);
        }
    });

    res.status(200).json({
        success: true,
        totalStudents: students.length,
        submittedCount: submitted.length,
        notSubmittedCount: notSubmitted.length,
        submitted,
        notSubmitted
    });
});







export { registerUser, loginUser,  logout, refreshAccessToken, getBatches, getAbatch, getUploadedAssignments, addStudent, submittedornot}



