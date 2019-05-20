import React, { useState } from "react";
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
import Modal from "components/Modal/Modal"
import Backdrop from "components/Modal/Backdrop"

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function MyTasks(props) {

  const [creating, setCreating] = useState(true)

  function modalCancelHandler() {
    console.log("cancel")
    setCreating(false)
  }

  function modalConfirmHandler() {
    console.log("new task added")
  }

  const { classes } = props;
  return (
    <div>
      {creating && <Backdrop
      />}
      {creating && <Modal
        title="Add New Task"
        canConfirm
        canCancel
        onCancel={() => setCreating(false)}
        onConfirm={modalConfirmHandler}
      />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: 15
          }}>
            <Fab color="secondary" aria-label="Add" className={classes.fab} onClick={() => setCreating(!creating)}>
              <Add />
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
