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
    algoState,
    algoStep,
    algoProposer,
    updateMatches,
    algoProposals,
  } = marriageContext;

  console.log(algoProposals);

  const handleStepClick = () => {
    updateMatches(algoStep, algoProposer);
  };

  //console.log(market);

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
      <Grid container justify="center" style={{ marginTop: "3vh" }}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{ backgroundColor: "lightgreen" }}
            onClick={() => handleStepClick()}
          >
            Step Through DA Algorithm
          </Button>
        </Grid>
        <Grid item xs={4}>
          {algoState.length > 0 && (
            <Alert severity="success">{algoState}</Alert>
          )}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">Reset Market</Button>
        </Grid>
      </Grid>
      {market.men.map((man, i) => {
        return (
          <Grid
            key={man.name}
            container
            justify="space-between"
            spacing={1}
            style={{ marginTop: "3vh" }}
          >
            <MarriageAvatar person={man} gender="male" />
            <MarriageAvatar person={market.women[i]} gender="female" />
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default StableMarriageResults;
