import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import StableMarriageInputs from "./StableMarriageInputs";

const StableMarriageSimulator = () => {
  return (
    <Grid item xs={10} style={{ marginTop: "3vh" }}>
      <Paper variant="outlined">
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              align="left"
              style={{ marginLeft: "10px" }}
            >
              Simulation Area
            </Typography>
            <Typography
              variant="body1"
              align="left"
              style={{ marginLeft: "10px" }}
            >
              Fill out the simulation inputs to simulate a marriage market
            </Typography>
          </Grid>
          <StableMarriageInputs />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default StableMarriageSimulator;
