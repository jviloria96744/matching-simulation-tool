import React, { useReducer } from "react";
import MarriageContext from "./marriageContext";
import MarriageReducer from "./marriageReducer";
import {
  CREATE_MARKET,
  SET_MARRIAGE_MARKET_IS_LOADING,
  UPDATE_PREFERENCES,
  CREATE_PROPOSALS,
  ACCEPT_PROPOSALS,
  RESET_MARKET,
  SET_AVATAR_CLASS,
  CLEAR_AVATAR_CLASS,
} from "../types";

const MarriageState = (props) => {
  const initialState = {
    market: null,
    marriageMarketIsLoading: false,
    algoStage: "Proposal",
    algoStep: 0,
    algoProposer: null,
    isStable: null,
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

  const updatePreferences = (person, newPrefs) => {
    dispatch({
      type: UPDATE_PREFERENCES,
      payload: {
        person,
        newPrefs,
      },
    });
  };

  const createProposals = (step) => {
    dispatch({
      type: CREATE_PROPOSALS,
      payload: step,
    });
  };

  const acceptProposals = () => {
    dispatch({
      type: ACCEPT_PROPOSALS,
    });
  };

  const setIsLoading = () => {
    dispatch({
      type: SET_MARRIAGE_MARKET_IS_LOADING,
    });
  };

  const resetMarket = () => {
    dispatch({
      type: RESET_MARKET,
    });
  };

  const setAvatarClass = (person, match) => {
    dispatch({
      type: SET_AVATAR_CLASS,
      payload: [person, match],
    });
  };

  const clearAvatarClass = () => {
    dispatch({
      type: CLEAR_AVATAR_CLASS,
    });
  };

  return (
    <MarriageContext.Provider
      value={{
        market: state.market,
        isLoading: state.marriageMarketIsLoading,
        algoStage: state.algoStage,
        algoStep: state.algoStep,
        algoProposer: state.algoProposer,
        isStable: state.isStable,
        createMarket,
        updatePreferences,
        createProposals,
        acceptProposals,
        resetMarket,
        setAvatarClass,
        clearAvatarClass,
      }}
    >
      {props.children}
    </MarriageContext.Provider>
  );
};

export default MarriageState;
