import React, { useState, useEffect, useContext } from "react";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
// Context
import UserContext from "../../context/UserContext";

function Tasks({ classes, tasksIndexes, tasks }) {
  const userContext = useContext(UserContext);

  const [taskData, setTaskData] = useState([])

  useEffect(() => {
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

    fetch(userContext.graphqlEndpoint, {
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
      .then(data => {
        setTaskData(data);
      })
      .catch(err => {
        throw new Error("Could not reach API!");
      })
  }, [userContext])

  const taskTitle = classnames(classes.tableCell, classes.taskTitle);
  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell}>Title</TableCell>
          <TableCell className={classes.tableCell}>Description</TableCell>
          <TableCell className={classes.tableCell}>Assigned To</TableCell>
          <TableCell className={classes.tableCell}>Created By</TableCell>
          <TableCell className={classes.tableCell}>Priority</TableCell>
        </TableRow>
        {tasksIndexes.map(value => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={taskTitle}>test task 123</TableCell>
            <TableCell className={classes.tableCell}>{tasks[value]}</TableCell>
            <TableCell className={classes.tableCell}>Casey Smith</TableCell>
            <TableCell className={classes.tableCell}>Tom Jolly</TableCell>
            <TableCell className={classes.tableCell}>4 (important)</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Complete Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Done"
                  className={classes.tableActionButton}
                >
                  <Done
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withStyles(tasksStyle)(Tasks);
