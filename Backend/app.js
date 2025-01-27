import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import {config} from "dotenv";
import {connectDB} from "./data/database.js";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js";
import cors from "cors";

const app = express();
config({
    path: "./data/config.env",
});
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI,
    method: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server started on port",process.env.PORT);
});

app.use(errorMiddleware);