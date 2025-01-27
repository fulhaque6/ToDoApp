import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"todoApp"
    }).then(()=>{
        console.log("Connected to DB");
    }).catch(err=>{
        console.log(err);
    })
}