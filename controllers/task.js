import {taskModel} from "../model/task.js";
import ErrorHandler from "../middleware/error.js";


export const newTask = async (req, res) => {
    const {title, description} = req.body;
    await taskModel.create({
        title,
        description,
        user:req.user
    });
    res.status(201).send({
        success: true,
        message: "Task created successfully",
    });
}

export const getMyTasks = async (req, res) => {
    const tasks = await taskModel.find({user: req.user._id});
    res.status(200).send({
        success: true,
        tasks
    })
}

export const updateTask = async (req, res,next) => {
    const task = await taskModel.findById(req.params.id);
    if (!task){
        return next(new ErrorHandler('Task Not Found',404));
    }
    task.isComplete = !task.isComplete;
    await task.save();
    res.status(200).send({
        success: true,
        message: "Task updated successfully",
    })
}

export const deleteTask = async (req, res,next) => {
    const task = await taskModel.findById(req.params.id);
    if (!task){
        return next(new ErrorHandler('Task Not Found',404));
    }
    await task.deleteOne();
    res.status(200).send({
        success: true,
        message: "Task deleted successfully",
    })
}