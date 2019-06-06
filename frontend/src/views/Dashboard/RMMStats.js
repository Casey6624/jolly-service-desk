import React , {useState, useContext, useEffect, Fragment} from "react";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
// Custom Components
import Modal from "../../components/Modal/Modal"
// Context
import HttpContext from "../../context/HttpContext"

export default function RMMStats({classes}){

    const httpContext = useContext(HttpContext)

    const [RMMData, setRMMData] = useState(null)
    const [openModal, setOpen] = useState(false)

    useEffect(() => {
        setRMMData(httpContext.RMMData)
    }, [httpContext.RMMData])

    if(!RMMData){
      return <div>Loading...</div>
    }
    
     return(
        <Fragment>
          {openModal &&<Modal
          title="Your Active Tasks"
          modalType="reading"  
          onCancel={() => setOpen(false)}  
        > 
        </Modal>}
            <GridContainer>
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
                      <a href="#pablo" onClick={e => e.preventDefault()}>
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
                      <a href="#pablo" onClick={e => e.preventDefault()}>
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
                      <a href="#pablo" onClick={e => e.preventDefault()}>
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

