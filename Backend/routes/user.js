import express from "express";
import {isAuthenticated} from "../middleware/auth.js";
import {getAllUsers, registerUser, loginUser, getUserById, getMyProfile, logout} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);

router.get("/myProfile",isAuthenticated,getMyProfile);

router.get("/userId/:id",getUserById);

export default router;