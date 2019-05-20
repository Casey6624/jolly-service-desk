const { buildSchema } = require("graphql")

module.exports = TaskSchema = buildSchema(`
    type Task {
        _id: ID!
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
        status: Int!
        createdBy: String!
    }

    input TaskInput {
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
        status: Int!
        createdBy: String!
    }

    type RootQuery{
        tasks: [Task!]!
    }

    type RootMutation{
        createTask(taskInput: TaskInput): Task
        editTask(taskID: ID!, taskInput: TaskInput): Task
        delTask(taskID: ID!): Task
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `)