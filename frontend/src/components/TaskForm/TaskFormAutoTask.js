import React, { useState, useContext } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// Additional Components
import moment from "moment"
// Context
import UserContext from "../../context/UserContext"
import HttpContext from "../../context/HttpContext"
// Helpers 
import { transformPriority } from "../../helpers/index"
// Libraries


export default function TaskFormEditing({ classes, onClose, editTaskData }) {

    const priorities = [1, 2, 3, 4, 5]

    const userContext = useContext(UserContext)
    const httpContext = useContext(HttpContext)

    const autoTaskTicket = {
        QueueID: httpContext.autoTaskQueueID, // Used to add to the helpdesk queue
        id: 0, // 0 creates a new task, pass a taskID if we need to edit
        AccountID: 0,
        DueDateTime: '2018-12-17',
        Title: taskTitle,
        Status: 1, // only 1 works, cannot set completed etc
        //Priority: taskPriority // 1 = High, 2 = Medium, 3 = Low, 4 = Critical
    }

    const { _id, title, description, createdBy, status } = editTaskData

    const [taskTitle, setTaskTitle] = useState(title)
    const [taskDescription, setTaskDescription] = useState(description)
    const [taskDueDate, setTaskDueDate] = useState(null)
    const [error, setError] = useState("Please fill out all fields which are marked with an asterix (*)")

    const styles = {
        cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
        }
    };

    function handleFormChange({ name, value }) {
        switch (name) {
            case "taskTitle":
                setTaskTitle(value)
                break;
            case "taskDescription":
                setTaskDescription(value)
                break;
            case "taskDueDate":
                setTaskDueDate(value)
                break;
        }
    }

    function initialValidation() {

        if (!taskTitle) {
            setError("Error! Please ensure you have filled out the required fields.")
            return
        }
        submitNewTask(taskDescription, taskTitle)
        onClose()
    }

    function submitNewTask(taskDescription, taskTitle) {

        const currUser = userContext.username
        if (!taskTitle) return

        if (taskDescription === "") {
            taskDescription = "N/A"
        }

        if (taskDueDate === null) {
            const now = moment(new Date()).format()
            setTaskDueDate(now)
        }

        let requestBody = {
            Title: taskTitle,
            Description: taskDescription,
            DueDate: taskDueDate
        }

        fetch(httpContext.ATPSAEndpoint, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                console.log(res)
            })
            .then(resData => {
                console.log(resData)
            })
            .catch(err => {
                throw new Error("Could not reach API!" + err);
            });
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={error === "Create New AutoTask Ticket With The Following Information" ? "info" : "danger"}>
                        <p className={styles.cardCategoryWhite}> {error} </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Task Title*"
                                    id="task-title"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "taskTitle",
                                        required: true,
                                        onChange: e => handleFormChange(e.target),
                                        value: taskTitle
                                    }}

                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem>
                                <TextField
                                    id="date"
                                    label="Ticket Due Date"
                                    name="taskDueDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={e => handleFormChange(e.target)}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Task Description"
                                    id="about-me"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "taskDescription",
                                        onChange: e => handleFormChange(e.target),
                                        value: taskDescription
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
            <Button type="button" color="success" style={{ margin: "auto", marginTop: 0, marginBottom: 0 }} onClick={initialValidation}>
                Submit
            </Button>
        </GridContainer >
    );
}
