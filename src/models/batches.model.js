import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const batchSchema = new Schema({
    batchname : {
       type : String,
       required : true,
       unique: true,
       
    },
    trainer : {
        type : String,
        required : true,
    },
    
    
},
{
    timestamps: true
}
)



 

export const Batch = mongoose.model("Batch", batchSchema);
