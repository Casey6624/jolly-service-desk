import React, { useState, useContext } from "react";
// @material-ui/core components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
// Icons
import Coffee from "@material-ui/icons/LocalCafe";
// Libraries
import { NavLink } from "react-router-dom"
import moment from "moment"
// Context
import UserContext from "../../context/UserContext"
import HttpContext from "../../context/HttpContext"

export default function TaskFormReading({ onClose, myTaskData }) {

    if(myTaskData.length === 0){
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{margin: "auto"}}>
                    <h4>You're All Up To Date!</h4>
                    <p>Go and stick the kettle on. <Coffee /></p>
                </GridItem>
            </GridContainer >
        );
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <List style={{overflowY: "auto", height: 300}}>
              {myTaskData.map(task => <ListItem key={task._id}>
                  <ListItemText
                    primary={task.title}
                    secondary={`Created: ${moment(task.createdAt).calendar()}`}
                  />
                </ListItem>,
              )}
            </List>
                <NavLink to="/admin/tasks">
                <Button onClick={onClose} style={{margin: "auto", display: "list-item", listStyle: "none"}}> Go To Tasks </Button>
                </NavLink>
            </GridItem>
        </GridContainer >
    );
}
