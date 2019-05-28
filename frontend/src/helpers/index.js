import React, { useContext, useEffect } from "react"
import moment from "moment"

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

export function transformDate(date){
    return moment(+date).calendar()
}