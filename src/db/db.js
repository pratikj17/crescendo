import mongoose from "mongoose";

const connectDB = async () => {
    try{
//         connectionInstance is the return value from mongoose.connect().
//         It is an object that represents the current connection to the MongoDB instance. It has a detail about connect status etc
        
        const connectionInstance =   await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Connection task : " + connectionInstance.connection);
        console.log(`\n connection done ..!! DB HOST ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Error", error);
        process.exit(1);
    }
}


export default connectDB;