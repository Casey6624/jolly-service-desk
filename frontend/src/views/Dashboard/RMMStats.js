import React, { useState, useContext, useEffect, Fragment } from "react";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Chip from '@material-ui/core/Chip';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// Custom Components
import RMMStatsReading from "../../components/TaskForm/RMMStatsReading"
// Context
import HttpContext from "../../context/HttpContext"
// libraries
import moment from "moment"

export default function RMMStats({ classes }) {

  const httpContext = useContext(HttpContext)

  const [RMMData, setRMMData] = useState(null)
  const [openModal, setOpen] = useState(false)

  const [activeList, setActiveList] = useState(null)

  useEffect(() => {
    setRMMData(httpContext.RMMData)
  }, [httpContext.RMMData])

  function getLastRefresh() {
    return moment(httpContext.lastRMMRefresh).format('LTS');
  }

  if (!RMMData) {
    return (
      <Fragment>
        {!RMMData && httpContext.RMMFetchErr && <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"><strong>Connection Error</strong> - Struggling To Fetch RMM Data!</span>}
        />}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h4>Jolly Servers.</h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>bug_report</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Anti-Virus Issues</p>
                <h3 className={classes.cardTitle}>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <a>
                    Loading Data...
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>cached</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Servers Requiring Reboots</p>
                <h3 className={classes.cardTitle}> </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Warning />
                  <a>
                    Loading Data...
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>signal_cellular_off</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Offline Servers</p>
                <h3 className={classes.cardTitle}> </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Warning />
                  <a>
                    Loading Data...
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </Fragment>
    )
  }

  function triggerModal(listIndex) {
    setActiveList(listIndex)
    setOpen(true)
  }

  return (
    <Fragment>
      {openModal && <RMMStatsReading
        title="RMM"
        RMMStats={RMMData}
        onClose={() => setOpen(false)}
        activeList={activeList}
      />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h4>Jolly Servers.</h4> <Chip label={`Last Updated: ${getLastRefresh()}`} className={classes.chip} variant="outlined" style={{ marginRight: 10 }} />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>bug_report</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Anti-Virus Issues</p>
              <h3 className={classes.cardTitle}>
                {RMMData ? RMMData[0].length : null}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Warning />
                <a onClick={() => triggerModal(0)}>
                  View Servers
                      </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>cached</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Servers Requiring Reboots</p>
              <h3 className={classes.cardTitle}> {RMMData ? RMMData[1].length : null} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Warning />
                <a onClick={() => triggerModal(1)}>
                  View Servers
                      </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>signal_cellular_off</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Offline Servers</p>
              <h3 className={classes.cardTitle}> {RMMData ? RMMData[2].length : null} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Warning />
                <a onClick={() => triggerModal(2)}>
                  View Servers
                      </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  )
}

