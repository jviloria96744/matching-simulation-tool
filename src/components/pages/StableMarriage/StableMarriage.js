import React from "react";
import { Grid } from "@material-ui/core";
import StableMarriageDescription from "./StableMarriageDescription";
import StableMarriageSimulator from "./StableMarriageSimulator";
import StableMarriageResults from "./StableMarriageResults";

const StableMarriage = () => {
  return (
    <Grid container justify="center" style={{ marginTop: "3vh" }}>
      <StableMarriageDescription />
      <StableMarriageSimulator />
      <StableMarriageResults />
    </Grid>
  );
};

export default StableMarriage;
