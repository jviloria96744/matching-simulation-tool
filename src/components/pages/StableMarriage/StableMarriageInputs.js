import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import MarriageContext from "../../../context/marriage/marriageContext";

const StableMarriageInputs = () => {
  const [optimalSide, setOptimalSide] = useState("men");
  const [marketSize, setMarketSize] = useState("4");
  const [commonValue, setCommonValue] = useState("0");

  const marriageContext = useContext(MarriageContext);
  const { createMarket } = marriageContext;

  const handleButtonClick = () => {
    createMarket(parseInt(marketSize), optimalSide);
  };

  const handleRadioChange = (e) => {
    setOptimalSide(e.target.value);
  };

  const radioInput = (value, label) => {
    return <FormControlLabel value={value} control={<Radio />} label={label} />;
  };

  return (
    <Grid item xs={6} style={{ marginTop: "2vh", marginBottom: "2vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Simulation Inputs</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={optimalSide}
              onChange={(e) => handleRadioChange(e)}
              row
            >
              {radioInput("men", "Man Optimal")}
              {radioInput("women", "Woman Optimal")}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of Men/Women"
            type="number"
            value={marketSize}
            onChange={(e) =>
              setMarketSize(e.target.value.replace(/[^0-9]/g, ""))
            }
            inputProps={{
              min: "2",
              step: "1",
            }}
            style={{ marginRight: ".5vw" }}
          />
          <TextField
            label="Common Value"
            type="number"
            value={commonValue}
            onChange={(e) => setCommonValue(e.target.value)}
            disabled
            inputProps={{
              min: "0",
              step: ".5",
            }}
            style={{ marginLeft: ".5vw" }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1vh", width: "80%" }}
            onClick={() => handleButtonClick()}
          >
            Generate Preferences
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StableMarriageInputs;
