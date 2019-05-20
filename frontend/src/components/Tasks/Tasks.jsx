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
// helpers
import { transformPriority } from "../../helpers/index";

function completeTaskHandler(taskID) {
  console.log(`complete task with ID ${taskID}`);
}

function editTaskHandler(taskID) {
  console.log(`edit task with ID ${taskID}`);
}

function delTaskHandler(taskID) {
  console.log(`delete task with ID ${taskID}`);
}

function Tasks({ classes }) {
  const userContext = useContext(UserContext);

  const [taskData, setTaskData] = useState([]);

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
      .then(resData => {
        setTaskData(resData.data.tasks);
      })
      .catch(err => {
        throw new Error("Could not reach API!" + err);
      });
  }, [userContext]);

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
        {taskData.length > 0 && taskData.map(task => (
          <TableRow key={task._id} className={classes.tableRow}>
            <TableCell className={taskTitle}> {task.title} </TableCell>
            <TableCell className={classes.tableCell}> {task.description} </TableCell>
            <TableCell className={classes.tableCell}> {task.assignedTo} </TableCell>
            <TableCell className={classes.tableCell}> {task.createdBy} </TableCell>
            <TableCell className={classes.tableCell}> {transformPriority(task.priority)} </TableCell>
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
                  onClick={() => completeTaskHandler(task._id)}
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
                  onClick={() => editTaskHandler(task._id)}
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
                  onClick={() => delTaskHandler(task._id)}
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
