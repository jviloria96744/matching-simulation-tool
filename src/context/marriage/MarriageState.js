import React, { useReducer } from "react";
import MarriageContext from "./marriageContext";
import MarriageReducer from "./marriageReducer";
import {
  CREATE_MARKET,
  SET_MARRIAGE_MARKET_IS_LOADING,
  UPDATE_MATCHES,
} from "../types";

const MarriageState = (props) => {
  const initialState = {
    market: null,
    marriageMarketIsLoading: false,
    algoState: "",
    algoStep: 0,
    algoProposer: null,
    algoProposals: null,
    availableSuitors: null,
  };

  const [state, dispatch] = useReducer(MarriageReducer, initialState);

  const createMarket = (numPeople, proposer) => {
    setIsLoading();
    dispatch({
      type: CREATE_MARKET,
      payload: {
        numPeople,
        proposer,
      },
    });
  };

  const updateMatches = (step, proposer) => {
    dispatch({
      type: UPDATE_MATCHES,
      payload: {
        step: step,
        proposer: proposer,
      },
    });
  };

  const setIsLoading = () => {
    dispatch({
      type: SET_MARRIAGE_MARKET_IS_LOADING,
    });
  };

  return (
    <MarriageContext.Provider
      value={{
        market: state.market,
        isLoading: state.marriageMarketIsLoading,
        algoState: state.algoState,
        algoStep: state.algoStep,
        algoProposer: state.algoProposer,
        algoProposals: state.algoProposals,
        createMarket,
        updateMatches,
      }}
    >
      {props.children}
    </MarriageContext.Provider>
  );
};

export default MarriageState;
