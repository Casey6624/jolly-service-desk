const mongoose = require("mongoose")
const Task = require("../../models/Task")
const mail = require("../../mail/index");
const axios = require("axios")

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
            .then(() => {
                mail.sendNow(null, "new", args.taskInput)
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
            }
            if (res) {
                return res
            }
        })
        return taskInput
    },
    RMMData: async () => {
        let RMMData = await axios.get(process.env.RMM_ENDPOINT)
            .then(res => {
                return res.data
            })
            .then(token => {
                return axios.get("https://pinotage-api.centrastage.net/api/v2/account/devices", {
                    headers:
                    {
                        'cache-control': 'no-cache',
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(RMMData => {
                        const filtered = RMMData.data.devices.filter(site => site.siteUid === process.env.AT_JOLLY_SERVERS)

                        const jollyServers = []
                        filtered.forEach(server => {
                            jollyServers.push((({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }) => ({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }))(server))
                        });

                        rebootNeeded = jollyServers.filter(server => server.rebootRequired === true) // returns array of servers which need reboots

                        offlineServers = jollyServers.filter(server => server.online === false) // returns array of offline servers

                        antiVirusServers = jollyServers.filter(server => server.antivirus.antivirusStatus !== 'RunningAndUpToDate' || server.antivirus.antivirusStatus !== 'NotDetected')

                        return [antiVirusServers, rebootNeeded, offlineServers]

                    })
                    .catch(err => new Error("Can't fetch! - " + err))
            })
        return RMMData
    }
}