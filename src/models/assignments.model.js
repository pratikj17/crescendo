import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const assignmentSchema = new Schema({
    name : {
       type : String,
       required : true,
       unique: true,
       
    },
    fileUrl : {
      type : String,
      required :true
    },
    fileKey : {
        type : String,
        required: true
    },
    batch : {
        type : String,
        required : true,
    },
    student : [
        {
            type : Schema.Types.ObjectId,
            ref : "Student"
        }
    ]
},
{
    timestamps: true
}
)



 

export const Assignments = mongoose.model("Assignments", assignmentSchema);
