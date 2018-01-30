const {Task} = require('../models/task.model');

exports.getAllTasksController = async (req, res, next) => {
    try {
        const allTasks = await Task.find({});
        res.json(allTasks);
    } catch (error) {
        return next(error);
    }
};

exports.getSingleTaskController = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        return next(error);
    }
};

exports.postNewTaskController = async (req, res, next) => {
    try {
        const {body} = req;
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return next(error);
    }
};

exports.updateTaskController = async (req, res, next) => {
    try {
        const {body} = req;
        const taskUpdated = await Task.findByIdAndUpdate(req.params.id, body, {new: true});
        res.json(taskUpdated);
    } catch (error) {
        return next(error);
    }
};

exports.removeTaskController = async (req, res, next) => {
    try {
        const taskRemoved = await Task.findByIdAndRemove(req.params.id);
        res.json(taskRemoved);
    } catch (error) {
        return next(error);
    }
};
