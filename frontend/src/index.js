import React, { useState } from "react"
import ReactDOM from "react-dom";

import AuthenticatedApp from "./RootAuth/index"
import UnauthenticatedApp from "./RootUnauth/index"

export default function App() {
  const [auth, setAuth] = useState(null)
  return auth === null ? <UnauthenticatedApp setAuth={setAuth} /> : <AuthenticatedApp auth={auth} setAuth={setAuth} />
}

ReactDOM.render(<App />, document.getElementById("root"));
