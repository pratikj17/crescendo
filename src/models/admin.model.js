import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const adminSchema = new Schema({
    username : {
       type : String,
       required : true,
       unique: true,
       lowercase: true,
       trim : true,
       index : true
    },
    StaffId : {
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim : true,
     },
     fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
     },
     password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    refreshToken : {
        type: String
    }
},
{
    timestamps: true
}
)

adminSchema.pre("save", async function ( next) {   
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10),
    next();
})



adminSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password, this.password)
}

// const user = await User.findOne({ email: req.body.email });
// if (!user) {
//     return res.status(400).send('Invalid email or password.');
// }

// const isMatch = await user.isPasswordCorrect(req.body.password);
// if (!isMatch) {
//     return res.status(400).send('Invalid email or password.');
// }

adminSchema.methods.generateAccessToken = function () {
    const payload = {
        _id: this._id,
        email: this.email,
        name: this.name,
        fullname: this.fullname
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '1h'
    };

    return jwt.sign(payload, secret, options);
};



adminSchema.methods.generateRefreshToken = function () {
    const payload = {
        _id: this._id
    };

    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d'
    };

    return jwt.sign(payload, secret, options);
};
 

export const Admin = mongoose.model("Admin", adminSchema);
