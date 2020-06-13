import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography } from "@material-ui/core";
import { MATCHING_PROBLEM_OBJECT } from "../../../utils/matchingProblemObject";

const Home = () => {
  return (
    <Grid container justify="center" style={{ marginTop: "3vh" }}>
      <Grid item xs={10}>
        <Paper variant="outlined">
          <Typography variant="body1">
            This can be a general paragraph about matching, general description,
            maybe links to seminal papers, etc.
          </Typography>
        </Paper>
      </Grid>
      {MATCHING_PROBLEM_OBJECT.map((problem) => {
        return (
          <Grid
            key={problem.homeTitle}
            item
            xs={8}
            style={{ marginTop: "3vh" }}
          >
            <Paper variant="outlined">
              <Typography variant="h4" align="left">
                {problem.homeTitle}
              </Typography>
              <Typography variant="body1" align="left">
                {problem.homeDescription}
              </Typography>
              <Typography
                variant="body2"
                align="left"
                style={{ marginTop: "1vh" }}
              >
                <Link to={problem.routeUrl} style={{ textDecoration: "none" }}>
                  Go To {problem.homeTitle} page
                </Link>
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
