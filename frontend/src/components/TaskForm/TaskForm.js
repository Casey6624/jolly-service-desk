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
// Helpers 
import { transformPriority } from "../../helpers/index"



export default function TaskForm({ classes }) {

    const userContext = useContext(UserContext)

    const priorities = [1, 2, 3, 4, 5]

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

    function handleFormChange(event) {
        const { value, name } = event.target

        console.log(value, name)
    }


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <p className={styles.cardCategoryWhite}>Please fill out all fields which are marked with an asterix (*) </p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer style={{ marginTop: 15 }}>
                            <GridItem xs={12} sm={12} md={6}>
                                <InputLabel htmlFor="age-native-simple" style={{ fontSize: "1rem" }}>Assign Task To* </InputLabel>
                                <Select
                                    native
                                    name="assignedTo"
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
                                >
                                    {userContext.JITUsers.map((user, index) => <option key={user} value={user}> {user} </option>)}
                                </Select>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <InputLabel htmlFor="age-native-simple">Choose Task Priority* </InputLabel>
                                <Select
                                    native
                                    name="assignedTo"
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        font: "inherit",
                                        color: "currentColor",
                                        width: "100 %",
                                        border: 0,
                                        margin: 0,
                                        padding: 6,
                                    }}
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
                                    onChange={e => handleFormChange()}
                                    name="taskTitle"
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
                                        multiline: true,
                                        rows: 5
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">Update Profile</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer >
    );
}
