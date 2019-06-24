import React, { useState, useContext, Fragment } from "react";
// @material-ui/core components
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
// Icons
import Coffee from "@material-ui/icons/LocalCafe";
// Libraries
import { NavLink } from "react-router-dom"

export default function RMMStatsReading({ onClose, RMMStats, activeList }) {

    if (RMMStats.length === 0) {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                    <h4>No RMM Stats Found :(</h4>
                    <p>Go and stick the kettle on while we try to refresh. <Coffee /></p>
                </GridItem>
            </GridContainer >
        );
    }
    const [toggleExpand, setToggleExpand] = useState(false)

    let extraDetails

    switch (activeList) {
        case 0:
            // we report on different stats to default so we need different JSX
            extraDetails = RMMStats[activeList].map((stat, index) => <Fragment key={`__${RMMStats[activeList][index].hostname}__`}>
                <div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                    <h4 style={{ fontWeight: "bold" }}>{RMMStats[activeList][index].hostname}</h4>
                    <h4>{RMMStats[activeList][index].domain}</h4>
                </div><div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                    <p> AntiVirus Status: <span style={{ color: "#ef5350" }}>{RMMStats[activeList][13].antivirus.antivirusStatus} </span> </p>
                    <p> AntiVirus Product: <span style={{ color: "#ffa726" }}>{RMMStats[activeList][13].antivirus.antivirusProduct !== null ? RMMStats[activeList][0].antivirus.antivirusProduct : "N/A"} </span> </p>
                </div>
            </Fragment>)
            break;
        default:
            extraDetails = RMMStats[activeList].map((stat, index) => <Fragment key={`__${RMMStats[activeList][index].hostname}__`}>

                <div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                    <h4 style={{ fontWeight: "bold" }}>{RMMStats[activeList][index].hostname}</h4>
                    <h4>{RMMStats[activeList][index].domain}</h4>
                </div><div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                    <p> OS: <span style={{ color: "#66bb6a" }}>{RMMStats[activeList][index].operatingSystem !== null ? RMMStats[activeList][index].operatingSystem : "Could Not Detect"} </span> </p>
                    <p> Server IP Address: <span style={{ color: "#ffa726" }}>{RMMStats[activeList][index].intIpAddress !== null ? RMMStats[activeList][index].intIpAddress : "N/A"} </span> </p>
                </div>
            </Fragment>)
            break;
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <List>
                    <Card style={{ overflowY: "auto", height: toggleExpand ? 600 : 300 }}>
                        <div style={{ margin: 10 }}>
                            <h2>{activeList === 0 ? "Servers With Anti-Virus Issues" : activeList === 1 ? "Server Requiring Reboots" : "Offline Servers"}</h2>
                            {extraDetails}
                        </div>
                    </Card>
                </List>
                <Button color="primary" onClick={() => setToggleExpand(!toggleExpand)} style={{ margin: "auto", display: "list-item", listStyle: "none" }}> {toggleExpand ? "Shrink" : "Expand"} </Button> <br />
                <NavLink to="/admin/dashboard">
                    <Button color="danger" onClick={onClose} style={{ margin: "auto", display: "list-item", listStyle: "none" }}> Close </Button>
                </NavLink>
            </GridItem>
        </GridContainer >
    );
}
