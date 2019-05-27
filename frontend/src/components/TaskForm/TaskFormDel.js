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

export default function TaskFormDel({ classes, onClose, delTaskData }) {

    const userContext = useContext(UserContext)
    const httpContext = useContext(HttpContext)


    const { _id, assignedTo, priority, title, description, createdBy, status } = delTaskData

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


    function delTask() {

        onClose()

        let requestBody = {
            query: `
            mutation{
                delTask(taskID: "${_id}"){
                  title
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
                throw new Error("Could not reach API!" + err);
            });
    }


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="danger">
                        <p className={styles.cardCategoryWhite}> CAUTION: This operation is irreversible. </p>
                    </CardHeader>
                    <CardBody>
                        Task Title:  <strong>{title}</strong> <br />
                        Task Description:  <strong>{description}</strong> <br />
                        Created By:  <strong>{createdBy}</strong> <br />
                        Assigned To:  <strong>{assignedTo}</strong>
                    </CardBody>
                </Card>
            </GridItem>
            <Button type="button" color="info" style={{ margin: "auto", marginTop: 0, marginBottom: 0 }} onClick={delTask}>
                Delete Task
            </Button>
        </GridContainer >
    );
}
