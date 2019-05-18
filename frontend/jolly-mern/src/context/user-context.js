import { createContext } from "react"

const UserContext = createContext({
    name: null,
    username: null,
    accessToken: null,
    login: () => { }
})

export default UserContext