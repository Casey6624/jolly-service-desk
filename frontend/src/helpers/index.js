import React, { useContext, useEffect } from "react"

import HttpContext from "../context/HttpContext"
import UserContext from "../context/UserContext"

// used to transform the priority in the tasks View so the user gets a little more insight into how the tasks are weighted
export function transformPriority(priority) {
    let transformedPriority;
    switch (priority) {
        case 1:
            transformedPriority = "1 - (Critical)";
            break;
        case 2:
            transformedPriority = "2 - (High)";
            break;
        case 3:
            transformedPriority = "3 - (Medium)";
            break;
        case 4:
            transformedPriority = "4 - (Low)";
            break;
        case 5:
            transformedPriority = "5 - (When Convinent)"
            break;
    }
    return transformedPriority;
}

export function submitNewTask(taskAssignedTo, taskDescription, taskPriority, taskTitle) {
    const httpContext = useContext(HttpContext)
    const userContext = useContext(UserContext)

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
                  status: 0
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
            console.log(resData)
        })
        .catch(err => {
            throw new Error("Could not reach API!" + err);
        });
}