import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export const StableMarriageDescription = () => {
  return (
    <Grid item xs={10}>
      <Paper variant="outlined">
        <Typography variant="body1">
          Stable Marriage Problem Description
        </Typography>
      </Paper>
    </Grid>
  );
};

export default StableMarriageDescription;
