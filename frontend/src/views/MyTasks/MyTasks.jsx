import React, { useState, useContext } from "react";
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
import Chip from '@material-ui/core/Chip';
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Modal from "components/Modal/Modal"
import moment from "moment"
import Snackbar from '@material-ui/core/Snackbar';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import HttpContext from "../../context/HttpContext";

function MyTasks(props) {

  const httpContext = useContext(HttpContext)

  const [creating, setCreating] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  function getLastRefresh() {
    return moment(httpContext.lastTaskRefresh).format('LTS');
  }

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
            margin: 15,
            alignItems: "center"
          }}>

        { httpContext.fetchErr && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id"><strong>Connection Error</strong> - Unable To Connect To Database</span>}
      /> }

            <Chip label={`Last Updated: ${getLastRefresh()}`} className={classes.chip} variant="outlined" style={{ marginRight: 10 }} />
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
              },
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
              }
            ]}

          />
        </GridItem>
      </GridContainer>
    </div>
  );

}

export default withStyles(dashboardStyle)(MyTasks);
