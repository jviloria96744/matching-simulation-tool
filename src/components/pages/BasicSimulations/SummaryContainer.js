import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { MATCHING_PROBLEM_OBJECT } from "../../../utils/matchingProblemObject";

export const SummaryContainer = () => {
  const [marketSelection, setMarketSelection] = useState("");

  const handleRadioChange = (e) => {
    setMarketSelection(e.target.value);
  };

  const radioInput = (value, label) => {
    return <FormControlLabel value={value} control={<Radio />} label={label} />;
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={marketSelection}
            onChange={(e) => handleRadioChange(e)}
          >
            {MATCHING_PROBLEM_OBJECT.map((problem) => {
              return radioInput(problem.selectionValue, problem.menuName);
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" align="left">
          {`${marketSelection} [Paragraph]`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SummaryContainer;
