const mongoose = require("mongoose")
const Task = require("../../models/Task")

module.exports = GraphQLResolvers = {
    tasks: () => {
        return Task.find()
            .then(tasks => {
                return tasks.map(task => {
                    return { ...task._doc }
                })
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    },
    createTask: (args) => {
        const { title, description, assignedTo, priority, status, createdBy } = args.taskInput
        // new Mongoose model
        const task = new Task({
            title: title,
            description: description,
            assignedTo: assignedTo,
            priority: +priority,
            status: +status,
            createdBy: createdBy
        })
        let createdTask
        return task
            .save()
            .then(res => {
                createdTask = { ...res._doc }
                return createdTask
            })
            .catch(err => {
                console.log(err)
                throw err
            })
        return task
    },
    editTask: async ({ taskID, taskInput }) => {
        await Task.findByIdAndUpdate({ _id: taskID }, taskInput, { useFindAndModify: false }, (err, res) => {
            if (err) {
                throw new Error("There was an issue updating the previous task, please try again later.")
                return
            }
            if (res) {
                return res
            }
        })
        return taskInput
    },
    delTask: async ({ taskID }) => {
        let deletedTask;
        try {
            await Task.findByIdAndDelete({ _id: taskID }, (err, res) => {
                deletedTask = res
            })
            return deletedTask
        }
        catch (err) {
            throw err
        }
    },
    updateStatus: async ({ taskID, taskInput }) => {
        await Task.findByIdAndUpdate({ _id: taskID }, taskInput, { useFindAndModify: false }, (err, res) => {
            if (err) {
                throw new Error("There was an issue updating the previous task status, please try again later.")
                return
            }
            if (res) {
                return res
            }
        })
        return taskInput
    }
}