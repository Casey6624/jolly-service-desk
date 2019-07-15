import React, { useContext, useState, useEffect } from "react";
import useInterval from "../hooks/useInterval"
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import HttpContext from "../context/HttpContext"

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

export default function App({ auth, setAuth }) {

    const [allTasks, setAllTasks] = useState([])
    const [lastTaskRefresh, setLastTaskRefresh] = useState(null)
    const [myTasks, setMyTasks] = useState([])
    const [fetchErr, setFetchErr] = useState(null)
    const [RMMFetchErr, setRMMFetchErr] = useState(null)
    const [username, setUsername] = useState(null); // this will eventually be taken from MSAL returned data
    const [RMMData, setRMMData] = useState(null)
    const [lastRMMRefresh, setLastRMMRefresh] = useState(null)

    const graphqlUrl = "https://app.jollyit.co.uk/api/graphql"

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

        fetch(graphqlUrl, {
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
                setFetchErr(null)
                // Use reverse to put tasks in order from new to old
                setAllTasks(resData.data.tasks.reverse());
                setLastTaskRefresh(new Date())
            })
            .catch(err => {
                console.log("Unable To Fetch")
                setFetchErr(err)
            });
    }

    function fetchRMMStats() {
        const requestBody = {
            query: ` query{
        RMMData{
          hostname
          intIpAddress
          operatingSystem
          domain
          rebootRequired
          online
          antivirus{
            antivirusProduct
            antivirusStatus
          }
        }
      }`};

        fetch(graphqlUrl, {
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
                setRMMData(resData.data.RMMData)
                setRMMFetchErr(null)
                setLastRMMRefresh(new Date())
            })
            .catch(err => {
                setRMMFetchErr(err)
                console.log("Unable To Fetch" + err)
            });
    }

    useEffect(() => {
        if (username && allTasks.length > 0) {
            let myTasks = allTasks.filter(({ assignedTo, status }) => assignedTo === username && status === false || assignedTo === "Anyone@jollyit.co.uk" && status === false)
            setMyTasks(myTasks)
            if (myTasks.length > 0) {
                document.title = ` (${myTasks.length}) Jolly IT | Tasks`
                return
            }
            document.title = "Jolly IT | Tasks"
        }
    }, [allTasks, username])

    useInterval(() => {
        fetchAllTasks()
        fetchRMMStats()
    }, 15000)

    useEffect(() => {
        fetchAllTasks()
        fetchRMMStats()
    }, [])

    useEffect(() => {
        if (auth) {
            setUsername(auth.account.userName)
        }
    }, [auth])

    function logout() {
        localStorage.clear();
        setAuth(null)
    }

    return (
        <Router history={hist}>
            <UserContext.Provider
                value={{
                    username: username, JITUsers: [
                        "AccountsDL@jollyit.co.uk",
                        "Ben@jollyit.co.uk",
                        "Casey@jollyit.co.uk",
                        "CSPLicenses@jollyit.co.uk",
                        "Tom@jollyit.co.uk",
                        "Jenna@sewjolly.co.uk",
                        "Tony@jollyit.co.uk",
                        "Lewis@jollyit.co.uk",
                        "Dan@jollyit.co.uk",
                        "Jude@jollyit.co.uk",
                        "Anyone@jollyit.co.uk"
                    ],
                    logout: () => logout()
                }}
            >
                <HttpContext.Provider value={{
                    graphqlEndpoint: graphqlUrl,
                    ATPSAEndpoint: "https://tasks.jollyit.co.uk/php/AT/createTicket.php",
                    fetchAllTasks: fetchAllTasks,
                    autoTaskQueueID: 29682833, // The Helpdesk AT Queue
                    allTasks: allTasks,
                    lastTaskRefresh: lastTaskRefresh,
                    myTasks: myTasks,
                    fetchErr: fetchErr,
                    RMMData: RMMData,
                    lastRMMRefresh: lastRMMRefresh,
                    RMMFetchErr: RMMFetchErr
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
