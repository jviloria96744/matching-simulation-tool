import {
  CREATE_MARKET,
  SET_MARRIAGE_MARKET_IS_LOADING,
  UPDATE_MATCHES,
} from "../types";
import { getRandomNames } from "../../utils/randomNames";

export default (state, action) => {
  switch (action.type) {
    case CREATE_MARKET:
      const newMarket = createMarket(action.payload.numPeople);
      return {
        ...state,
        market: newMarket,
        marriageMarketIsLoading: false,
        algoProposer: action.payload.proposer,
        availableSuitors:
          action.payload.proposer === "male" ? newMarket.men : newMarket.women,
      };

    case UPDATE_MATCHES:
      const gender = action.payload.proposer === "male" ? "men" : "women";
      const oppGender = action.payload.proposer === "male" ? "women" : "men";
      const newProposals = getNewProposals(
        action.payload.step,
        gender,
        oppGender,
        state.market
      );
      const newMatch = getNewMatch(
        gender,
        action.payload.step,
        state.market,
        oppGender
      );

      const newAlgoState = getNewAlgoState(
        newMatch,
        state.market[gender][action.payload.step].match,
        state.market[gender][action.payload.step].name,
        state.algoState
      );

      return {
        ...state,
        availableSuitors: state.market[gender].filter(
          (person) => person.match === null
        ),
        algoProposals: newProposals,
        algoStep: (action.payload.step + 1) % state.market.men.length,
        algoState: newAlgoState,
        market: {
          ...state.market,
          [gender]: state.market[gender].map((person, index) => {
            if (index === action.payload.step) {
              return {
                ...person,
                match: newMatch,
              };
            }

            return person;
          }),
          [oppGender]:
            newMatch === null
              ? [...state.market[oppGender]]
              : state.market[oppGender].map((person) => {
                  if (person.name === newMatch) {
                    return {
                      ...person,
                      match: state.market[gender][action.payload.step].name,
                    };
                  }

                  return person;
                }),
        },
      };
    case SET_MARRIAGE_MARKET_IS_LOADING:
      return {
        ...state,
        marriageMarketIsLoading: true,
      };
    default:
      return state;
  }
};

const createMarket = (numPeople) => {
  const marketParticipants = getRandomNames(numPeople);
  let prefs = {
    men: [],
    women: [],
  };

  prefs.men = marketParticipants.men.map((man) => {
    let prefs = [...marketParticipants.women.sort(() => 0.5 - Math.random())];
    return {
      name: man,
      preferences: prefs,
      match: null,
    };
  });

  prefs.women = marketParticipants.women.map((woman) => {
    let prefs = [...marketParticipants.men.sort(() => 0.5 - Math.random())];
    return {
      name: woman,
      preferences: prefs,
      match: null,
    };
  });

  return prefs;
};

const getNewMatch = (gender, step, market, oppGender) => {
  if (market[gender][step].match !== null) {
    return market[gender][step].match;
  }

  let newMatch = null;
  for (let pref of market[gender][step].preferences) {
    let prefObject = market[oppGender].find((person) => person.name === pref);

    let myIndex = prefObject.preferences.indexOf(market[gender][step].name);
    let currentMatchIndex = prefObject.preferences.indexOf(prefObject.match);

    if (prefObject.match === null || myIndex < currentMatchIndex) {
      newMatch = pref;
      break;
    }
  }

  return newMatch;
};

const getNewAlgoState = (newMatch, oldMatch, name, oldAlgoState) => {
  if (newMatch === oldMatch) {
    return oldAlgoState;
  }

  return `${name} is now matched with ${newMatch}`;
};

const getNewProposals = (step, gender, oppGender, market) => {
  const proposals = market[oppGender].map((person) => {
    const suitors = market[gender].filter(
      (suitor) => suitor.preferences[step] === person.name
    );

    return {
      name: person.name,
      proposals: suitors.map((suitor) => {
        return {
          name: suitor.name,
          index: person.preferences.indexOf(suitor.name),
        };
      }),
    };
  });

  return proposals;
};

const getNewMatches = (market, proposals, step, gender, oppGender) => {
  proposals.map((proposal) => {});
};
