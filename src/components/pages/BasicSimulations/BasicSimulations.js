import React from "react";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import SummaryContainer from "./SummaryContainer";

const BasicSimulations = () => {
  return (
    <Grid container justify="center" style={{ marginTop: "3vh" }}>
      <Grid item xs={10}>
        <Paper variant="outlined">
          <Typography variant="h6" align="left" style={{ marginLeft: "1vw" }}>
            Available Market Simulations
          </Typography>
          <Divider />
          <SummaryContainer />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BasicSimulations;
