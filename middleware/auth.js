import jwt from "jsonwebtoken";
import {userModel} from "../model/user.js";


export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(404).send({
            success: false,
            message: "Login First"
        });
    }
    const user = jwt.verify(token,"askhdhashdjkakshjiojoaijs");
    req.user = await userModel.findById(user._id);
    next();
}