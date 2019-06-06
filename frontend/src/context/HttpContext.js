/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext } from "react"

const HttpContext = createContext({
    graphqlEndpoint: null,
    fetchAllTasks: function () { },
    autoTaskQueueID: null,
    allTasks: [],
    lastTaskRefresh: null,
    myTasks: [],
    fetchErr: null,
    RMMData: null,
    lastRMMRefresh: null
})

export default HttpContext