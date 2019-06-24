import React, { useState, useEffect, useContext, Fragment } from "react";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
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
import { transformPriority, transformDate } from "../../helpers/index";
// Custom components
import Searchbar from "../Searchbar/Searchbar";

function Tasks({ classes, filter, refreshing, setRefreshing }) {
  const httpContext = useContext(HttpContext);

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
  //--------------------
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    try {
      console.log("refreshing!")
      httpContext.fetchAllTasks()
      setRefreshing(!refreshing)
    }
    catch (err) {
      console.log(err)
    }
    return setRefreshing(false)
  }, [refreshing])

  // filter items
  useEffect(() => {
    if (httpContext.allTasks.length > 0) {
      if (searchQuery) {
        let filteredData = httpContext.allTasks.filter(({ title }) => title.toUpperCase().includes(searchQuery));
        setFilteredTaskData(filteredData);
      } else {
        switch (filter) {
          case "ALL":
            setFilteredTaskData(null)
            break;
          case "ACTIVE":
            const filteredActive = httpContext.allTasks.filter(task => !task.status)
            setFilteredTaskData(filteredActive)
            break;
          case "COMPLETED":
            const filteredCompleted = httpContext.allTasks.filter(task => task.status)
            setFilteredTaskData(filteredCompleted)
            break;
        }
      }
    }
  }, [filter, httpContext.allTasks, searchQuery])

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
    let wholeTask = httpContext.allTasks.filter(task => task._id.includes(taskID))
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

  function searchQueryHandler(e) {
    const { value } = e.target
    setSearchQuery(value.toUpperCase())
  }

  function handleClearInput() {
    setSearchQuery("")
  }
  const taskTitle = classnames(classes.tableCell, classes.taskTitle);
  const taskDescription = classnames(classes.tableCell, classes.taskDescriptionCell)
  if (filteredTaskData !== null) {
    return (
      <GridContainer className={classes.tableResponsive} style={{ overflowX: "auto" }}>
        <GridItem xs={12} sm={12} md={12}>
          <Searchbar
            focus
            value={searchQuery}
            onchange={searchQueryHandler}
            clearInput={handleClearInput}
          />
        </GridItem>
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
              title="Export Task To AutoTask Ticket"
              onCancel={() => setAutotasking(false)}
            />}
            <TableBody className={classes.tableResponsive} >
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Status</TableCell>
                <TableCell colSpan={2} className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Title/Description</TableCell>
                <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Assigned To</TableCell>
                <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Created By</TableCell>
                <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Priority</TableCell>
              </TableRow>
              {filteredTaskData.length > 0 && filteredTaskData.map(task => (
                <Fragment key={task._id}>
                  <TableRow>
                    <TableCell className={classes.tableCell} rowSpan={3}>
                      {!task.status ? <FailureIcon style={{ color: "grey" }} /> : <SuccessIcon style={{ color: "green" }} />}
                    </TableCell>
                    <TableCell colSpan={2} className={taskTitle}> {task.title} </TableCell>
                    <TableCell className={classes.tableCell}> {task.assignedTo} </TableCell>
                    <TableCell className={classes.tableCell}> {task.createdBy} </TableCell>
                    <TableCell className={classes.tableCell}> {transformPriority(task.priority)}  </TableCell>
                    <TableCell className={classes.tableCell} style={{ alignItems: "center", flexDirection: "row", display: "flex", height: "auto" }}>
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
                  <TableRow>
                    <TableCell className={taskDescription}> {task.description} </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell />
                    <TableCell />
                    <TableCell className={classes.tableCell}> <strong style={{ color: "#ef7d00" }}>UPDATED: </strong> {transformDate(task.updatedAt)} </TableCell>
                    <TableCell className={classes.tableCell}> <strong style={{ color: "#ef7d00" }}>CREATED: </strong> {transformDate(task.createdAt)} </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
          <p> {`${filteredTaskData.length} Results Found.`} </p>
        </GridItem>
      </GridContainer>
    )
  }

  return (
    <GridContainer className={classes.tableResponsive} style={{ overflowX: "auto" }}>
      <GridItem xs={12} sm={12} md={12}>
        <Searchbar
          focus
          value={searchQuery}
          onchange={searchQueryHandler}
          clearInput={handleClearInput}
        />
      </GridItem>
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
            title="Export Task To AutoTask Ticket"
            onCancel={() => setAutotasking(false)}
          />}
          <TableBody className={classes.tableResponsive} >
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Status</TableCell>
              <TableCell colSpan={2} className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Title/Description</TableCell>
              <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Assigned To</TableCell>
              <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Created By</TableCell>
              <TableCell className={classes.tableCell} style={{ color: "#333f48", fontWeight: "bold", textTransform: "uppercase" }}>Priority</TableCell>
            </TableRow>
            {httpContext.allTasks.length > 0 && httpContext.allTasks.map(task => (
              <Fragment key={task._id}>
                <TableRow>
                  <TableCell className={classes.tableCell} rowSpan={3}>
                    {!task.status ? <FailureIcon style={{ color: "grey" }} /> : <SuccessIcon style={{ color: "green" }} />}
                  </TableCell>
                  <TableCell colSpan={2} className={taskTitle}> {task.title} </TableCell>
                  <TableCell className={classes.tableCell}> {task.assignedTo} </TableCell>
                  <TableCell className={classes.tableCell}> {task.createdBy} </TableCell>
                  <TableCell className={classes.tableCell}> {transformPriority(task.priority)}  </TableCell>
                  <TableCell className={classes.tableCell} style={{ alignItems: "center", flexDirection: "row", display: "flex", height: "auto" }}>
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
                <TableRow>
                  <TableCell className={taskDescription}> {task.description} </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell colSpan={1} className={classes.tableCell}> <strong style={{ color: "#ef7d00" }}>UPDATED: </strong> {transformDate(task.updatedAt)} </TableCell>
                  <TableCell colSpan={1} className={classes.tableCell}> <strong style={{ color: "#ef7d00" }}>CREATED: </strong> {transformDate(task.createdAt)} </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(tasksStyle)(Tasks);