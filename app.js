const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const { buildSchema } = require("graphql")
const graphqlHttp = require("express-graphql");

const Task = require("./models/Task")

const app = express();

app.use(bodyParser.json({
    useNewUrlParser: true
}));

app.use("/graphql", graphqlHttp({
    schema: buildSchema(`
    type Task {
        _id: ID!
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
    }

    input TaskInput {
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
    }

    type RootQuery{
        tasks: [Task!]!
    }

    type RootMutation{
        createTask(taskInput: TaskInput): Task
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        tasks: () => {
            return Task.find()
                .then(tasks => {
                    return tasks.map(task => {
                        console.log(...task._doc)
                        return { ...task._doc }
                    })
                })
                .catch(err => {
                    console.log(err)
                    throw err
                })
        },
        createTask: (args) => {
            const { title, description, assignedTo, priority } = args.taskInput
            // new Mongoose model
            const task = new Task({
                title: title,
                description: description,
                assignedTo: assignedTo,
                priority: +priority
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
        }
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@jollytasks-buxaz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then(() => {
        console.log("Successfully connected to MongoDB")
        app.listen(4001)
    })
    .catch(err => {
        console.log(`Ooops! Error: ${err}`)
    })

app.listen(3000)