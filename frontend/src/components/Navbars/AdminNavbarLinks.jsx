import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Modal from "../Modal/Modal"
import { NavLink } from "react-router-dom"
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
// Context 
import HttpContext from "../../context/HttpContext"
import UserContext from "../../context/UserContext"

function HeaderLinks(props) {

  const [open, setOpen] = useState(false)

  const [openModal, setOpenModal] = useState(false)

  const httpContext = useContext(HttpContext)

  function handleToggle(val) {
    setOpenModal(!val)
  };

  const { classes } = props;
  return (
    <div>
      <NavLink to="/admin/dashboard">
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
      </NavLink>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
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
          open={open}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
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
      {openModal && <Modal
        title="Your Active Tasks"
        modalType="reading"
        myTaskData={httpContext.myTasks}
        onCancel={() => setOpenModal(false)}
      >
      </Modal>}
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Person"
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>
    </div>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
