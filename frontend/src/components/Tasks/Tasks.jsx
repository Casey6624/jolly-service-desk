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
import Modal from "components/Modal/Modal"
// Context
import UserContext from "../../context/UserContext";
import HttpContext from "../../context/HttpContext";
// helpers
import { transformPriority } from "../../helpers/index";

function Tasks({ classes }) {
  const userContext = useContext(UserContext);
  const httpContext = useContext(HttpContext);

  const [taskData, setTaskData] = useState([]);

  const [editing, setEditing] = useState(false)
  const [editTask, setEditTask] = useState(null)
  //-------
  const [deleting, setDeleting] = useState(null)
  const [delTask, setDelTask] = useState(null)
  //-------
  //const [completing, setCompleting] = useState(null)
  //const [compTask, setCompTask] = useState(null)
  //-------
  const [updating, setUpdating] = useState(null)
  const [updateTask, setUpdateTask] = useState(null)


  function updateTaskHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setUpdating(true)
    setUpdateTask(wholeTask)
  }

  function getTaskFromId(taskID) {
    let wholeTask = taskData.filter(task => task._id.includes(taskID))
    return wholeTask[0] || null
  }

  function editTaskHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setEditing(true)
    setEditTask(wholeTask)
  }

  function delTaskHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setDeleting(true)
    setDelTask(wholeTask)
  }

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
        setTaskData(resData.data.tasks);
      })
      .catch(err => {
        throw new Error("Could not reach API! " + err);
      });
  }, [userContext]);

  const taskTitle = classnames(classes.tableCell, classes.taskTitle);
  return (
    <Table className={classes.table}>
      {editing && <Modal
        modalType="editing"
        editTaskData={editTask}
        title="Edit Existing Task"
        onCancel={() => setEditing(false)}
      />}
      {deleting && <Modal
        modalType="deleting"
        delTaskData={delTask}
        title="Delete Selected Task"
        onCancel={() => setDeleting(false)}
      />}
      {updating && <Modal
        modalType="updating"
        updateTaskData={updateTask}
        title={updateTask.status ? "Change Task To Incomplete" : "Complete Task"}
        onCancel={() => setUpdating(false)}
      />}
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
                  onClick={() => updateTaskHandler(task._id)}
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
