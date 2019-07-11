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
// Helpers
import {transformDate} from "../../helpers/index"

export default function TaskFormReading({ onClose, myTaskData }) {

    if(myTaskData.length === 0){
        return (
            <GridContainer className="modal">
                <GridItem xs={12} sm={12} md={12}>
                    <h4>You're All Up To Date!</h4>
                    <p>Go and stick the kettle on. <Coffee /></p>
                </GridItem>
            </GridContainer >
        );
    }

    return (
        <GridContainer className="modal">
            <GridItem xs={12} sm={12} md={12}>
                <List style={{overflowY: "auto", height: 300, margin: "0 auto"}}>
              {myTaskData.map(task => <ListItem key={task._id} style={{background: "#f2f2f2", marginBottom: 5}}>
                  <ListItemText
                    primary={`${task.title}`}
                    secondary={`Created: ${transformDate(task.createdAt)} | Assigned To: ${task.assignedTo}`}
                  />
                </ListItem>
              )}
            </List>
                <NavLink to="/admin/tasks">
                <Button onClick={onClose} style={{margin: "auto", display: "list-item", listStyle: "none"}}> Go To Tasks </Button>
                </NavLink>
            </GridItem>
        </GridContainer >
    );
}
