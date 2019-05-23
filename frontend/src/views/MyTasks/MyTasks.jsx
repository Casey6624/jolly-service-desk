import React, { useState } from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from '@material-ui/core/Fab';
// @material-ui/icons
import Computer from "@material-ui/icons/Computer";
import ViewModule from "@material-ui/icons/ViewModule";
import MarkerCheck from "@material-ui/icons/Done";
import Add from '@material-ui/icons/Add';
import Refresh from '@material-ui/icons/Refresh';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Modal from "components/Modal/Modal"

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function MyTasks(props) {

  const [creating, setCreating] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { classes } = props;
  return (
    <div>
      {creating && <Modal
        modalType="creating"
        title="Add New Task"
        onCancel={() => setCreating(false)}
      />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: 15
          }}>
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => setRefreshing(true)} style={{ marginRight: 10 }}>
              <Refresh />
            </Fab>

            <Fab color="secondary" aria-label="Add" className={classes.fab} onClick={() => setCreating(!creating)}>
              <Add />
            </Fab>
          </div>
          <CustomTabs
            title="Tasks: "
            headerColor="primary"
            tabs={[
              {
                tabName: "ALL",
                tabIcon: ViewModule,
                tabContent: (
                  <Tasks
                    refreshing={refreshing}
                    setRefreshing={setRefreshing}
                    filter="ALL"
                  />
                )
              },
              {
                tabName: "ACTIVE",
                tabIcon: Computer,
                tabContent: (
                  <Tasks
                    refreshing={refreshing}
                    setRefreshing={setRefreshing}
                    filter="ACTIVE"
                  />
                )
              },
              {
                tabName: "COMPLETED",
                tabIcon: MarkerCheck,
                tabContent: (
                  <Tasks
                    refreshing={refreshing}
                    setRefreshing={setRefreshing}
                    filter="COMPLETED"
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
