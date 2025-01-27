import {userModel} from "../model/user.js";
import bcrypt from "bcrypt";
import {sendCookie} from "../utils/features.js";

export const getAllUsers = async (req, res) => {

}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select("+password");
    if (!user) {
        return res.status(404).send("Invalid Email or Password");
    }
    const matchPassword = await bcrypt.compare(password,user.password);
    if (!matchPassword) {
        return res.status(404).send("Invalid Email or Password");
    }
    sendCookie(user,res,200,`Welcome Back ${user.name}`);
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    let user = await userModel.findOne({email});
    if (user) {
        return res.status(404).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    sendCookie(user,res,201,"User registered successfully");
}

export const getMyProfile = (req, res) => {
    res.status(200).send({
        success: true,
        user: req.user
    });
}

export const logout = (req, res) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).send({
        success: true,
        message: "Logged out"
    })
}

export const getUserById = async (req,res)=>{

}