import React , {useState, useContext, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// Custom Components
import RMMStats from "./RMMStats"

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function Dashboard(props) {

    const { classes } = props;
    return (
      <div>
        <RMMStats classes={classes}/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Jolly Contact Details</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Name", "Email", "Ext"]}
                  tableData={[
                    ["Ben Griffiths", <a href="mailto:Ben@jollyit.co.uk">Ben@jollyit.co.uk</a>, "805"],
                    ["Casey Smith", <a href="mailto:Casey@jollyit.co.uk">Casey@jollyit.co.uk</a>, "806"],
                    ["Lewis Dexter", <a href="mailto:Lewis@jollyit.co.uk">Lewis@jollyit.co.uk</a>, "804"],
                    ["Tom Jolly", <a href="mailto:Tom@jollyit.co.uk">Tom@jollyit.co.uk</a>, "802"],
                    ["Tony Durell", <a href="mailto:Tony@jollyit.co.uk">Tony@jollyit.co.uk</a>, "541"],
                    ["Jude Batham", <a href="mailto:Jude@jollyit.co.uk">Jude@jollyit.co.uk</a>, "803"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

export default withStyles(dashboardStyle)(Dashboard);
