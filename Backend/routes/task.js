import express from 'express';
import {deleteTask, getMyTasks, newTask, updateTask} from "../controllers/task.js";
import {isAuthenticated} from "../middleware/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/all",isAuthenticated,getMyTasks);
router.put("/:id",isAuthenticated,updateTask);
router.delete("/:id",isAuthenticated,deleteTask);

export default router;