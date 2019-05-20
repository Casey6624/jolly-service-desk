import React, { useContext } from "react"
import myMSALObj from "./appConfig"
import UserContext from "../../context/user-context"
export default function LoginScreen(props) {

    const userContext = useContext(UserContext)

    function signIn() {
        var request = {
            scopes: ["user.read"]
        };
        myMSALObj.loginPopup(request).then(function (loginResponse) {
            console.log(loginResponse)
            const { name, userName } = loginResponse.account
            const { idToken } = loginResponse
            userContext.login([name, userName], idToken)
            return
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h1> Jolly IT | Tasks  </h1>
            <button onClick={() => signIn()}> Sign in Using Office 365 </button>
        </div>
    )
}