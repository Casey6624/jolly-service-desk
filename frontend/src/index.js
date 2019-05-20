import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <UserContext.Provider
      value={{ graphqlEndpoint: "http://localhost:4000/graphql" }}
    >
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </UserContext.Provider>
  </Router>,
  document.getElementById("root")
);
