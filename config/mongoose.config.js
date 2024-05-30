import mongoose from "mongoose";

export const mongooseConnection = async () => {

    const isConnected = await mongoose.connect(process.env.db_url)
    if(isConnected){
        console.log("connected to database successfully");
    }

}