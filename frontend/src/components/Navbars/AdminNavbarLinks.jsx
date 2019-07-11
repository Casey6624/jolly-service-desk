import React, { useContext, useState, useEffect, Fragment } from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import PowerSetting from "@material-ui/icons/PowerSettingsNew";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Modal from "../Modal/Modal"
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
// Context 
import HttpContext from "../../context/HttpContext"
import UserContext from "../../context/UserContext"

function HeaderLinks(props) {

  const [openModal, setOpenModal] = useState(false)

  const httpContext = useContext(HttpContext)
  const userContext = useContext(UserContext)

  function handleToggle(val) {
    setOpenModal(!val)
  };

  const { classes } = props;
  return (
    <Fragment>
      {openModal && <Modal
        title="Your Active Tasks"
        modalType="reading"
        myTaskData={httpContext.myTasks}
        onCancel={() => setOpenModal(false)}
      >
    </Modal>}
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={false ? "menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={() => handleToggle(openModal)}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}> {httpContext.myTasks.length} </span>
          <Hidden mdUp implementation="css">
          </Hidden>
        </Button>
        <Poppers
          false={false}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !false }) +
            " " +
            classes.pooperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
            </Grow>
          )}
        </Poppers>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Log Out"
        className={classes.buttonLink}
        onClick={() => userContext.logout()}
      >
        <PowerSetting className={classes.icons} />
        {window.innerWidth < 959 ? <span className={classes.notifications} style={{textTransform: "none"}}> Log Out </span> : null} 
      </Button>
    </div>
    </Fragment>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
