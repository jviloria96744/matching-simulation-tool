import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import StableMarriageDescription from "./StableMarriageDescription";

const StableMarriage = () => {
  return (
    <Grid container justify="center" style={{ marginTop: "3vh" }}>
      <StableMarriageDescription />
      <Grid item xs={10} style={{ marginTop: "3vh" }}>
        <Paper variant="outlined">
          <Typography variant="body1">Simulation Area</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StableMarriage;
