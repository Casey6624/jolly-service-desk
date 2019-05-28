import React, { useContext, useState, useEffect } from "react";
import useInterval from "./hooks/useInterval"
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

  const [allTasks, setAllTasks] = useState([])

  const [myTasks, setMyTasks] = useState([])

  const username = "Casey@jollyit.co.uk";

  const [lastTaskRefresh, setLastTaskRefresh] = useState(null)

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
              createdAt
              updatedAt
            }
          }`
    };

    fetch("http://localhost:4000/graphql", {
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
        setAllTasks(resData.data.tasks);
        setLastTaskRefresh(new Date())
      })
      .catch(err => {
        throw new Error("Could not reach API! " + err);
      });
  }
  
  useEffect(() => {
    if(username && allTasks.length > 0){
      let myTasks = allTasks.filter(({ assignedTo, status }) => assignedTo === username || assignedTo === "Anyone@jollyit.co.uk" && status === false)
      setMyTasks(myTasks)
      if(myTasks <= 0) return
      document.title = ` (${myTasks.length}) Jolly IT | Tasks`
    }
  }, [allTasks, username])

  useInterval(() => {
    fetchAllTasks()
  }, 15000)



  return (
    <Router history={hist}>
      <UserContext.Provider
        value={{
          username: username, JITUsers: [
            "Casey@jollyit.co.uk",
            "Tom@jollyit.co.uk",
            "Tony@jollyit.co.uk",
            "Ben@jollyit.co.uk",
            "Lewis@jollyit.co.uk",
            "Dan@jollyit.co.uk",
            "Jude@jollyit.co.uk",
            "Anyone@jollyit.co.uk"
          ]
        }}
      >
        <HttpContext.Provider value={{
          graphqlEndpoint: "http://localhost:4000/graphql",
          fetchAllTasks: fetchAllTasks,
          autoTaskQueueID: 29682833, // The Helpdesk AT Queue
          allTasks: allTasks,
          lastTaskRefresh: lastTaskRefresh,
          myTasks: myTasks
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
