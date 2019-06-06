import React , {useState, useContext, useEffect, Fragment} from "react";
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
// Context
import HttpContext from "../../context/HttpContext"

export default function RMMStats({classes}){

    const httpContext = useContext(HttpContext)

    const [RMMData, setRMMData] = useState(null)

    useEffect(() => {
        setRMMData(httpContext.RMMData)
    }, [httpContext.RMMData])

     return(
        <Fragment>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Anti-Virus Issues</p>
                    <h3 className={classes.cardTitle}>
                      {"RMMData"}
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Get more space
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Servers Requiring Reboots</p>
                    <h3 className={classes.cardTitle}> {"RMMData"} </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Last 24 Hours
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Icon>info_outline</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Offline Servers</p>
                    <h3 className={classes.cardTitle}> {"RMMData"} </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <LocalOffer />
                      Tracked from Github
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
        </Fragment>
    ) 
}

