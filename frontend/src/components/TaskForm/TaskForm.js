import React, { useState, useContext } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
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
import CardFooter from "components/Card/CardFooter.jsx";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
// Context
import UserContext from "../../context/UserContext"
import HttpContext from "../../context/HttpContext"
// Helpers 
import { transformPriority } from "../../helpers/index"

export default function TaskForm({ classes, onClose }) {

    const priorities = [1, 2, 3, 4, 5]

    const userContext = useContext(UserContext)
    const httpContext = useContext(HttpContext)

    const [taskAssignedTo, setTaskAssignedTo] = useState("Casey@jollyit.co.uk")
    const [taskPriority, setTaskPriority] = useState(priorities[0])
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
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
            case "assignedTo":
                setTaskAssignedTo(value)
                break;
            case "priority":
                setTaskPriority(value)
                break;
            case "taskTitle":
                setTaskTitle(value)
                break;
            case "taskDescription":
                setTaskDescription(value)
                break;
        }
    }

    function initialValidation() {

        if (!taskAssignedTo || !taskPriority || !taskTitle) {
            setError("Error! Please ensure you have filled out the required fields.")
            return
        }
        submitNewTask(taskAssignedTo, taskDescription, taskPriority, taskTitle)
        onClose()
    }

    function submitNewTask(taskAssignedTo, taskDescription, taskPriority, taskTitle) {

        const currUser = userContext.username
        if (!taskAssignedTo || !taskTitle || !taskPriority) return

        if (taskDescription === "") {
            taskDescription = "N/A"
        }

        const requestBody = {
            query: `
                mutation{
                    createTask(taskInput: {
                      title: "${taskTitle}"
                      description:"${taskDescription}"
                      assignedTo: "${taskAssignedTo}"
                      priority: ${taskPriority}
                      status: false
                      createdBy: "${currUser}"
                    }){
                      title
                      description
                    }
                  }
                `
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
                httpContext.fetchAllTasks()
            })
            .catch(err => {
                console.log(err)
                throw new Error("Could not reach API!" + err);
            });
    }


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={error === "Please fill out all fields which are marked with an asterix (*)" ? "info" : "danger"}>
                        <p className={styles.cardCategoryWhite}> {error} </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer style={{ marginTop: 15 }}>
                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                <InputLabel htmlFor="assign-task" style={{ fontSize: "1rem" }}>Assign Task To* </InputLabel>
                                <Select
                                    native
                                    name="assignedTo"
                                    required
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        font: "inherit",
                                        color: "currentColor",
                                        width: "100%",
                                        border: 0,
                                        margin: 0,
                                        padding: 6,
                                    }}
                                    onChange={e => handleFormChange(e.target)}
                                >
                                    {userContext.JITUsers.map((user, index) => <option key={user} value={user}> {user} </option>)}
                                </Select>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} lg={6}>
                                <InputLabel htmlFor="priority-task" style={{ fontSize: "1rem" }}>Choose Task Priority* </InputLabel>
                                <Select
                                    native
                                    name="priority"
                                    selected
                                    required
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        font: "inherit",
                                        color: "currentColor",
                                        width: "100%",
                                        border: 0,
                                        margin: 0,
                                        padding: 6,
                                    }}
                                    onChange={e => handleFormChange(e.target)}
                                >
                                    {priorities.map((priority, index) => <option key={priority} value={priority}> {transformPriority(priority)} </option>)}
                                </Select>
                            </GridItem>
                        </GridContainer>
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
                                        onChange: e => handleFormChange(e.target)
                                    }}
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
                                        onChange: e => handleFormChange(e.target)
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

const styles = {
    th: {
        maxWidth: 125,
        minWidth: 125,
        padding: 0,
        overflowX: "auto",
        textAlign: "center"
    },
    td: {
        height: 40,
        padding: 5
    }
}