import React, { useState, Suspense } from "react"
import ReactDOM from "react-dom";

// Need to remove this for Lazy Loading to be fully implemented
import Authenticated from "./RootAuth/index"
import Unauthenticated from "./RootUnauth/index"

const UnauthenticatedApp = React.lazy(() => import("./RootUnauth/index"))
const AuthenticatedApp = React.lazy(() => import("./RootAuth/index"))

export default function App() {
  const [auth, setAuth] = useState(null)
  return(
    <Suspense fallback={<div>Loading...</div>} >
      {!auth ? <UnauthenticatedApp setAuth={setAuth} /> : <AuthenticatedApp auth={auth} setAuth={setAuth} />}
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
