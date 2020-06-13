import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import NavigationButtons from "./NavigationButtons";

/**
 * Basic Navbar component for the application
 */
const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: "1" }} align="left">
          Matching Market Simulation Tool
        </Typography>
        <NavigationButtons />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
