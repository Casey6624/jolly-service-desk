import { createContext } from "react"

const UserContext = createContext({
    token: null,
    login: (user, accessToken) => { },
    logout: () => { },
})

export default UserContext