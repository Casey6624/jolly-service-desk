/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext } from "react"

const HttpContext = createContext({
    graphqlEndpoint: null,
    submitNewTask: function (taskAssignedTo, taskDescription, taskPriority, taskTitle) { }
})

export default HttpContext