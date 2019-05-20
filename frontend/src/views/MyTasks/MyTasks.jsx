import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from '@material-ui/core/Fab';
// @material-ui/icons
import Computer from "@material-ui/icons/Computer";
import ViewModule from "@material-ui/icons/ViewModule";
import MarkerCheck from "@material-ui/icons/Done";
import Add from '@material-ui/icons/Add';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function MyTasks(props) {

  function handleAddNewTask() {
    console.log("new task")
  }

  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: 20
          }}>
            <Fab color="secondary" aria-label="Add" className={classes.fab}>
              <Add onClick={handleAddNewTask} />
            </Fab>
          </div>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "ALL",
                tabIcon: ViewModule,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                  />
                )
              },
              {
                tabName: "ACTIVE",
                tabIcon: Computer,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                  />
                )
              },
              {
                tabName: "COMPLETED",
                tabIcon: MarkerCheck,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );

}

export default withStyles(dashboardStyle)(MyTasks);
