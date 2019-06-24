import React, { useContext } from "react"
import myMSALObj from "./appConfig"
import LoginContext from "../context/LoginContext"

export default function LoginScreen({ setAuth }) {

    const loginContext = useContext(LoginContext)

    function signIn() {
        var request = {
            scopes: ["user.read"]
        };
        myMSALObj.loginPopup(request).then(function (loginResponse) {
            const { name, userName } = loginResponse.account
            const { idToken } = loginResponse
            loginContext.login([name, userName], idToken)
            setAuth(loginResponse)
            return
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <h1> Jolly IT | Tasks  </h1>
            <button onClick={() => signIn()}> Sign in Using Office 365 </button>
        </div>
    )
}