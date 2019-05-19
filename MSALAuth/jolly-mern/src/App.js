import React, { useState } from 'react';
import LoginScreen from "./components/LoginScreen/LoginScreen"
import UserContext from "./context/user-context"
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom"

import MainScreen from "./components/MainScreen/MainScreen"

function App() {

  function login(user, accessToken) {
    if (!user || !accessToken) return
    setUser([user[0], user[1]])
    setIdToken(accessToken)
    return
  }

  function logout() {
    setIdToken(null)
    setUser([null, null])
  }

  const [idToken, setIdToken] = useState(null)
  const [user, setUser] = useState([])

  return (

    <BrowserRouter>
      <UserContext.Provider value={{
        accessToken: idToken,
        name: user[0],
        username: user[1],
        login: login,
        logout: logout
      }}>
        <Switch>
          {idToken && <Redirect from="/" to="/app" exact />}
          {idToken && <Route path="/app" component={MainScreen} />}
          {!idToken && <LoginScreen />}
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
