import React, { useContext } from "react"
import UserContext from "../../context/user-context"

export default function MainScreen(props) {
    const userContext = useContext(UserContext)
    return (
        <div>
            <h1> Main Screen! </h1>
            <p> {userContext.name} </p>
            <button onClick={() => userContext.logout()}>Sign Out</button>
        </div>
    )
}