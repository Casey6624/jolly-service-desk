import React, { useContext, Fragment, useState } from "react"
import myMSALObj from "./appConfig"
import LoginContext from "../context/LoginContext"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';

export default function LoginScreen({ setAuth }) {

    const [ hover, setHover ] = useState(false)

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
        <Fragment>
            <div style={{ textAlign: "center", height: "100vh", margin: "5vh" }}>
                {hover ? <LockOpen style={{fontSize: 50}} /> : <Lock style={{fontSize: 50}}/>}
                <h1 style={{margin: 0}}> Jolly IT | Tasks  </h1>
                <p>NOTE: If this is your first time signing in, you will need to authorize the app on the following screen.</p>
                <h2>---</h2>
                <Button variant="contained" color="primary" onClick={() => signIn()} onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}> Sign in Using Office 365 </Button>
            </div>
        </Fragment>
    )
}