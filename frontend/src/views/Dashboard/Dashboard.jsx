import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
// Custom Components
import RMMStats from "./RMMStats"

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
