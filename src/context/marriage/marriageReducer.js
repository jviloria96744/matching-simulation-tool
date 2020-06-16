import {
  CREATE_MARKET,
  SET_MARRIAGE_MARKET_IS_LOADING,
  CREATE_PROPOSALS,
  ACCEPT_PROPOSALS,
  RESET_MARKET,
  SET_AVATAR_CLASS,
  CLEAR_AVATAR_CLASS,
} from "../types";
import { getRandomNames } from "../../utils/randomNames";

export default (state, action) => {
  switch (action.type) {
    case CREATE_MARKET:
      return {
        ...state,
        market: [...createMarket(action.payload.numPeople)],
        marriageMarketIsLoading: false,
        algoStep: 0,
        algoProposer: action.payload.proposer,
        isStable: false,
      };

    case RESET_MARKET:
      return {
        ...state,
        market: [...createMarket(state.market.length / 2)],
        algoStep: 0,
        algoStage: "Proposal",
        isStable: false,
      };

    case CREATE_PROPOSALS:
      return {
        ...state,
        market: [...createProposals(action.payload, state)],
        algoStage: "Accept",
      };

    case ACCEPT_PROPOSALS:
      let newMarket = acceptProposals(state);
      let isMarketStable =
        newMarket.filter((person) => person.match === null).length === 0;
      return {
        ...state,
        market: [...newMarket],
        algoStage: "Proposal",
        algoStep: state.algoStep + (1 % (state.market.length / 2)),
        isStable: isMarketStable,
      };

    case SET_MARRIAGE_MARKET_IS_LOADING:
      return {
        ...state,
        marriageMarketIsLoading: true,
      };

    case SET_AVATAR_CLASS:
      return {
        ...state,
        market: [
          ...state.market.map((person) => {
            if (!action.payload.includes(person.name)) {
              person.className = "avatar-transparent";
            }

            return person;
          }),
        ],
      };

    case CLEAR_AVATAR_CLASS:
      return {
        ...state,
        market: [
          ...state.market.map((person) => {
            person.className = "";
            return person;
          }),
        ],
      };
    default:
      return state;
  }
};

const createMarket = (numPeople) => {
  const marketParticipants = getRandomNames(numPeople);
  let market = [];
  market = [
    ...marketParticipants.men.map((man) => {
      let prefs = [...marketParticipants.women.sort(() => 0.5 - Math.random())];
      return {
        name: man,
        gender: "men",
        preferences: prefs,
        match: null,
        matchMessage: "",
        proposals: [],
      };
    }),
  ];

  market = [
    ...market,
    ...marketParticipants.women.map((woman) => {
      let prefs = [...marketParticipants.men.sort(() => 0.5 - Math.random())];
      return {
        name: woman,
        gender: "women",
        preferences: prefs,
        match: null,
        matchMessage: "",
        proposals: [],
        className: "",
      };
    }),
  ];

  return market;
};

const createProposals = (step, state) => {
  const { algoProposer, market } = state;
  const availableSuitors = market.filter(
    (person) => person.gender === algoProposer && person.match === null
  );

  return market.map((person) => {
    if (person.gender === algoProposer && person.match === null) {
      person.proposals.push(person.preferences[step]);
      person.matchMessage = `Made a proposal to ${person.preferences[step]}`;
    } else if (person.gender !== algoProposer) {
      let mySuitors = availableSuitors.filter(
        (suitor) => suitor.preferences[step] === person.name
      );
      person.proposals = [...mySuitors.map((suitor) => suitor.name)];
      person.matchMessage =
        person.proposals.length > 0
          ? `Received proposal(s) from ${person.proposals.join(", ")}`
          : "";
    } else {
      person.matchMessage = "";
    }

    return person;
  });
};

const acceptProposals = (state) => {
  const { algoProposer, market } = state;

  const matches = market.map((person) => {
    if (person.gender === algoProposer) {
      const proposee =
        person.match === null ? person.proposals[0] : person.match;
      const potentialMatch = market.find(
        (newPerson) => newPerson.name === proposee
      );

      if (isProposerMatch(person.name, potentialMatch)) {
        if (person.match === null) {
          person.match = person.proposals[0];
          person.matchMessage = `${person.proposals[0]} accepted my proposal`;
        } else {
          person.matchMessage = "";
        }
      } else {
        person.matchMessage = `${proposee} rejected my proposal`;
        person.match = null;
      }
    }

    if (person.gender !== algoProposer && person.proposals.length > 0) {
      const newMatch = accepteeMatch(
        person.match,
        person.proposals,
        person.preferences
      );
      if (person.match !== newMatch) {
        person.matchMessage = `I accepted ${newMatch}'s proposal`;
      } else {
        person.matchMessage = `I rejected my other proposals`;
      }
      person.match = newMatch;
    }
    return person;
  });

  return matches.map((person) => {
    person.proposals = [];
    return person;
  });
};

const isProposerMatch = (name, potentialMatch) => {
  const { proposals, preferences, match } = potentialMatch;
  console.log(proposals);
  console.log(preferences);
  console.log(match);

  const myIndex = preferences.indexOf(name);
  const suitorsIndex =
    proposals.length === 0
      ? preferences.length
      : proposals.map((suitor) => preferences.indexOf(suitor)).sort()[0];
  const matchIndex =
    preferences.indexOf(match) >= 0
      ? preferences.indexOf(match)
      : preferences.length;

  console.log(myIndex);
  console.log(suitorsIndex);
  console.log(matchIndex);

  return myIndex === Math.min(myIndex, suitorsIndex, matchIndex);
};

const accepteeMatch = (match, suitors, preferences) => {
  const suitorsIndex = suitors
    .map((suitor) => preferences.indexOf(suitor))
    .sort()[0];
  const matchIndex =
    preferences.indexOf(match) >= 0
      ? preferences.indexOf(match)
      : preferences.length;

  return preferences[Math.min(suitorsIndex, matchIndex)];
};
