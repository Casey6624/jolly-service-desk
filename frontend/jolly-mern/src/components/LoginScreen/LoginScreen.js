import React, { useState } from "react"
import myMSALObj from "./appConfig"

export default function LoginScreen(props) {

    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState([])

    function signIn() {
        var request = {
            scopes: ["user.read"]
        };
        myMSALObj.loginPopup(request).then(function (loginResponse) {
            const { name, userName } = loginResponse.account
            setUser([name, userName])
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h1> {user[0]} </h1>
            <h1> {user[1]} </h1>
            <button onClick={signIn}> Sign in Using Office 365 </button>
        </div>
    )
}