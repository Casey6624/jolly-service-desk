/* eslint-disable prettier/prettier */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>

        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()} Jolly IT
          </span>
        </p>
      </div>
    </footer>
  );
}

export default withStyles(footerStyle)(Footer);
