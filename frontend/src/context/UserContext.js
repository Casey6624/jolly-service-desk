/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext } from "react"

const UserContext = createContext({
    name: null,
    username: null,
    accessToken: null,
    login: (user, accessToken) => { },
    logout: () => { },
    graphqlEndpoint: "http://localhost:4000/graphql"
})

export default UserContext