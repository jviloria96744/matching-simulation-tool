import React, { Fragment, useContext } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import MarriageAvatar from "./MarriageAvatar";
import MarriageContext from "../../../context/marriage/marriageContext";

const StableMarriageResults = () => {
  const marriageContext = useContext(MarriageContext);
  const {
    market,
    isLoading,
    algoStage,
    createProposals,
    algoStep,
    algoProposer,
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

  const suitors = market.filter((person) => person.gender === algoProposer);
  const suitees = market.filter((person) => person.gender !== algoProposer);

  return (
    <Fragment>
      <Grid container justify="center" style={{ marginTop: "3vh" }}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "lightgreen" }}
            onClick={() => handleStepClick()}
            disabled={isStable}
          >
            {algoStage === "Proposal" ? "Make Proposals" : "Accept Proposals"}
          </Button>
        </Grid>
        <Grid item xs={4}>
          {isStable && (
            <Alert severity="success">We have a stable match!</Alert>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={() => resetMarket()}>
            Reset Market
          </Button>
        </Grid>
      </Grid>
      {suitors.map((proposer, i) => {
        return (
          <Grid
            key={proposer.name}
            container
            justify="space-between"
            spacing={1}
            style={{ marginTop: "3vh" }}
          >
            <MarriageAvatar person={proposer} proposer={true} />
            <MarriageAvatar person={suitees[i]} proposer={false} />
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default StableMarriageResults;
