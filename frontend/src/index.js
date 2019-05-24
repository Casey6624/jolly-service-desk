import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";
import HttpContext from "./context/HttpContext"

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

export default function App() {
  const httpContext = useContext(HttpContext)

  function fetchAllTasks() {
    const requestBody = {
      query: `
          query{
            tasks{
              _id
              title
              assignedTo
              createdBy
              description
              status
              priority
            }
          }`
    };

    fetch(httpContext.graphqlEndpoint, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to fetch data!");
        }
        return res.json();
      })
      .then(resData => {
        return resData.data.tasks;
      })
      .catch(err => {
        throw new Error("Could not reach API! " + err);
      });
  }

  return (
    <Router history={hist}>
      <UserContext.Provider
        value={{
          username: "caseyContext@jollyit.co.uk", JITUsers: [
            "Casey@jollyit.co.uk",
            "Tom@jollyit.co.uk",
            "Tony@jollyit.co.uk",
            "Ben@jollyit.co.uk",
            "Lewis@jollyit.co.uk",
            "Dan@jollyit.co.uk",
            "Jude@jollyit.co.uk",
            "anyone@jollyit.co.uk"
          ]
        }}
      >
        <HttpContext.Provider value={{
          graphqlEndpoint: "http://localhost:4000/graphql",
          fetchAllTasks: fetchAllTasks,
          autoTaskQueueID: 29682833
        }}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </HttpContext.Provider>
      </UserContext.Provider>
    </Router>
  )


}
ReactDOM.render(<App />, document.getElementById("root"));
