const { buildSchema } = require("graphql")

module.exports = TaskSchema = buildSchema(`
    type Task {
        _id: ID!
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
        status: Boolean!
        createdBy: String!
        createdAt: String!
        updatedAt: String!
    }

    input TaskInput {
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
        status: Boolean!
        createdBy: String!
    }

    input TaskInputEdit {
        title: String!
        description: String
        assignedTo: String!
        priority: Int!
    }

    input TaskInputUpdateStatus {
        status: Boolean!
    }

    type RootQuery{
        tasks: [Task!]!
    }

    type RootMutation{
        createTask(taskInput: TaskInput): Task
        editTask(taskID: ID!, taskInput: TaskInputEdit): Task
        delTask(taskID: ID!): Task
        updateStatus(taskID: ID!, taskInput: TaskInputUpdateStatus): Task
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `)