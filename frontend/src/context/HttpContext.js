/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext } from "react"

const HttpContext = createContext({
    graphqlEndpoint: null,
    ATPSAEndpoint: null,
    fetchAllTasks: function () { },
    autoTaskQueueID: null,
    allTasks: [],
    lastTaskRefresh: null,
    myTasks: [],
    fetchErr: null,
    RMMData: null,
    RMMFetchErr: null,
    lastRMMRefresh: null
})

export default HttpContext