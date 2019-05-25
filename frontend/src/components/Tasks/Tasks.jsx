import React, { useState, useEffect, useContext, Fragment } from "react";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Done from "@material-ui/icons/Done";
import Restore from "@material-ui/icons/Cached";
import Export from "@material-ui/icons/CloudUpload";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import FailureIcon from "@material-ui/icons/Cancel";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import Modal from "components/Modal/Modal"
import LinearProgress from '@material-ui/core/LinearProgress';
// Context
import UserContext from "../../context/UserContext";
import HttpContext from "../../context/HttpContext";
// helpers
import { transformPriority } from "../../helpers/index";

function Tasks({ classes, filter, refreshing, setRefreshing }) {
  const userContext = useContext(UserContext);
  const httpContext = useContext(HttpContext);

  const [taskData, setTaskData] = useState([]);

  const [filteredTaskData, setFilteredTaskData] = useState(null);
  // AutoTasking(ing) Task
  const [autotasking, setAutotasking] = useState(false)
  const [autoTaskTask, setAutoTaskTask] = useState(null)
  // Editing Task
  const [editing, setEditing] = useState(false)
  const [editTask, setEditTask] = useState(null)
  // Deleting Task
  const [deleting, setDeleting] = useState(false)
  const [delTask, setDelTask] = useState(null)
  // Updating Status Task
  const [updatingT, setUpdatingT] = useState(null)
  const [updatingF, setUpdatingF] = useState(null)
  const [updateTask, setUpdateTask] = useState(null)

  useEffect(() => {
    if (refreshing) {
      console.log("refreshing!")
      fetchAllTasks()
      setRefreshing(!refreshing)
    }
    return setRefreshing(false)
  }, [refreshing])

  // filter items
  useEffect(() => {
    if (taskData.length > 0) {
      switch (filter) {
        case "ALL":
          setFilteredTaskData(null)
          break;
        case "ACTIVE":
          const filteredActive = taskData.filter(task => !task.status)
          setFilteredTaskData(filteredActive)
          break;
        case "COMPLETED":
          const filteredCompleted = taskData.filter(task => task.status)
          setFilteredTaskData(filteredCompleted)
          break;
      }
    }
  }, [filter, taskData])

  function updateTaskTHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setUpdatingT(true)
    setUpdateTask(wholeTask)
  }

  function updateTaskFHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setUpdatingF(true)
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

  function autoTaskHandler(taskID) {
    const wholeTask = getTaskFromId(taskID)
    setAutotasking(true)
    setAutoTaskTask(wholeTask)
  }

  function handleUpdateTChanged() {
    setUpdatingT(false)
    setUpdateTask(null)
  }

  function handleUpdateFChanged() {
    setUpdatingF(false)
    setUpdateTask(null)
  }

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
        setTaskData(resData.data.tasks);
      })
      .catch(err => {
        throw new Error("Could not reach API! " + err);
      });
  }

  useEffect(() => {
    fetchAllTasks()
  }, []);

  if (filteredTaskData !== null) {
    return (
      <Fragment>
        {refreshing && <LinearProgress color="secondary" variant="query" />}
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
          {updatingT && <Modal
            modalType="updatingT"
            updateTaskData={updateTask}
            title="Complete Task"
            onCancel={handleUpdateTChanged}
          />}
          {updatingF && <Modal
            modalType="updatingF"
            updateTaskData={updateTask}
            title="Restore Back To Live Task"
            onCancel={handleUpdateFChanged}
          />}
          {autotasking && <Modal
            modalType="autotask"
            editTaskData={autoTaskTask}
            title="Export Task To AutoTask"
            onCancel={() => setAutotasking(false)}
          />}
          <TableBody>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>Status</TableCell>
              <TableCell className={classes.tableCell}>Title</TableCell>
              <TableCell className={classes.tableCell}>Description</TableCell>
              <TableCell className={classes.tableCell}>Assigned To</TableCell>
              <TableCell className={classes.tableCell}>Created By</TableCell>
              <TableCell className={classes.tableCell}>Priority</TableCell>
            </TableRow>
            {filteredTaskData.length > 0 && filteredTaskData.map(task => (
              <TableRow key={task._id} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {!task.status ? <FailureIcon style={{ color: "grey" }} /> : <SuccessIcon style={{ color: "green" }} />}
                </TableCell>
                <TableCell className={taskTitle}> {task.title} </TableCell>
                <TableCell className={classes.tableCell}> {task.description} </TableCell>
                <TableCell className={classes.tableCell}> {task.assignedTo} </TableCell>
                <TableCell className={classes.tableCell}> {task.createdBy} </TableCell>
                <TableCell className={classes.tableCell}> {transformPriority(task.priority)} </TableCell>
                <TableCell className={classes.tableActions}>
                  {!task.status && <Tooltip
                    id="tooltip-top"
                    title="Mark As Complete"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Complete Task"
                      className={classes.tableActionButton}
                      onClick={() => updateTaskTHandler(task._id)}
                    >
                      <Done
                        className={classes.tableActionButtonIcon}
                      />
                    </IconButton>
                  </Tooltip>}
                  {task.status && <Tooltip
                    id="tooltip-top"
                    title="Mark As Incomplete"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Restore Task"
                      className={classes.tableActionButton}
                      onClick={() => updateTaskFHandler(task._id)}
                    >
                      <Restore
                        className={classes.tableActionButtonIcon}
                      />
                    </IconButton>
                  </Tooltip>}
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
                  <Tooltip
                    id="tooltip-top-start"
                    title="Export To AutoTask"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Export To AutoTask"
                      className={classes.tableActionButton}
                      onClick={() => autoTaskHandler(task._id)}
                    >
                      <Export className={classes.tableActionButtonIcon + " " + classes.edit} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    )
  }

  const taskTitle = classnames(classes.tableCell, classes.taskTitle);
  return (
    <div className={classes.tableResponsive}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
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
            {updatingT && <Modal
              modalType="updatingT"
              updateTaskData={updateTask}
              title="Complete Task"
              onCancel={handleUpdateTChanged}
            />}
            {updatingF && <Modal
              modalType="updatingF"
              updateTaskData={updateTask}
              title="Restore Back To Live Task"
              onCancel={handleUpdateFChanged}
            />}
            {autotasking && <Modal
              modalType="autotask"
              editTaskData={autoTaskTask}
              title="Export Task To AutoTask"
              onCancel={() => setAutotasking(false)}
            />}
            <TableBody>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Status</TableCell>
                <TableCell className={classes.tableCell}>Title</TableCell>
                <TableCell className={classes.tableCell}>Description</TableCell>
                <TableCell className={classes.tableCell}>Assigned To</TableCell>
                <TableCell className={classes.tableCell}>Created By</TableCell>
                <TableCell className={classes.tableCell}>Priority</TableCell>
              </TableRow>
              {taskData.length > 0 && taskData.map(task => (
                <TableRow key={task._id}>
                  <TableCell className={classes.tableCell}>
                    {!task.status ? <FailureIcon style={{ color: "grey" }} /> : <SuccessIcon style={{ color: "green" }} />}
                  </TableCell>
                  <TableCell className={taskTitle}> {task.title} </TableCell>
                  <TableCell className={classes.tableCell}> {task.description} </TableCell>
                  <TableCell className={classes.tableCell}> {task.assignedTo} </TableCell>
                  <TableCell className={classes.tableCell}> {task.createdBy} </TableCell>
                  <TableCell className={classes.tableCell}> {transformPriority(task.priority)} </TableCell>
                  <TableCell className={classes.tableActions}>
                    {!task.status && <Tooltip
                      id="tooltip-top"
                      title="Mark As Complete"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Complete Task"
                        className={classes.tableActionButton}
                        onClick={() => updateTaskTHandler(task._id)}
                      >
                        <Done
                          className={classes.tableActionButtonIcon}
                        />
                      </IconButton>
                    </Tooltip>}
                    {task.status && <Tooltip
                      id="tooltip-top"
                      title="Mark As Incomplete"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Restore Task"
                        className={classes.tableActionButton}
                        onClick={() => updateTaskFHandler(task._id)}
                      >
                        <Restore
                          className={classes.tableActionButtonIcon}
                        />
                      </IconButton>
                    </Tooltip>}
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
                      title="Remove Task"
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
                    <Tooltip
                      id="tooltip-top-start"
                      title="Export To AutoTask"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Export To AutoTask"
                        className={classes.tableActionButton}
                        onClick={() => autoTaskHandler(task._id)}
                      >
                        <Export className={classes.tableActionButtonIcon + " " + classes.edit} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(tasksStyle)(Tasks);