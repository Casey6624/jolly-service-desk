/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext } from "react"

const HttpContext = createContext({
    graphqlEndpoint: null,
    fetchAllTasks: function () { }
})

export default HttpContext