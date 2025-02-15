import jwt from "jsonwebtoken";

export const sendCookie = (user,res,statusCode,message)=>{
    const token = jwt.sign({_id:user._id}, "askhdhashdjkakshjiojoaijs");
    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        status: "success",
        message
    });
}