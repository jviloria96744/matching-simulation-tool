import React, { Fragment, useContext } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Market from "./Market";
import MarriageContext from "../../../context/marriage/marriageContext";

const StableMarriageResults = () => {
  const marriageContext = useContext(MarriageContext);
  const {
    market,
    isLoading,
    algoStage,
    createProposals,
    algoStep,
    acceptProposals,
    resetMarket,
    isStable,
  } = marriageContext;

  console.log(market);

  const handleStepClick = () => {
    if (algoStage === "Proposal") {
      createProposals(algoStep);
    } else if (algoStage === "Accept") {
      acceptProposals();
    }
  };

  if (market === null && !isLoading) {
    return null;
  }

  if (market === null && isLoading) {
    return (
      <Grid container justify="center" style={{ marginTop: "3vh" }}>
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Fragment>
      <Grid container style={{ marginTop: "3vh" }}>
        <Grid item xs={8}>
          <Market />
        </Grid>
        <Grid
          item
          xs={4}
          style={{ boxShadow: "5px 5px 5px 5px", borderRadius: "5px" }}
        >
          <Grid container justify="space-around" style={{ marginTop: "3vh" }}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                style={{ backgroundColor: "lightgreen" }}
                onClick={() => handleStepClick()}
                disabled={isStable}
              >
                {algoStage === "Proposal"
                  ? "Make Proposals"
                  : "Accept Proposals"}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={() => resetMarket()}>
                Reset Market
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default StableMarriageResults;
