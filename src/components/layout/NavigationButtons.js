import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MATCHING_PROBLEM_OBJECT } from "../../utils/matchingProblemObject";

const NavigationButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Link to="/">
        <HomeIcon color="error" fontSize="large" />
      </Link>
      <Button color="inherit" onClick={handleClick}>
        Matching Simulations
        <ExpandMoreIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            to="/basic_simulations"
            onClick={handleClose}
            style={{ textDecoration: "none", color: "black" }}
          >
            Basic Simulations
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/advanced_simulations"
            onClick={handleClose}
            style={{ textDecoration: "none", color: "black" }}
          >
            Advanced Simulations
          </Link>
        </MenuItem>
        {MATCHING_PROBLEM_OBJECT.map((problem) => {
          return (
            <MenuItem key={problem.routeUrl}>
              <Link
                to={problem.routeUrl}
                onClick={handleClose}
                style={{ textDecoration: "none", color: "black" }}
              >
                {problem.menuName}
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};

export default NavigationButtons;
