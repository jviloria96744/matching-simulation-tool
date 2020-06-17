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
        newMarket.filter(
          (person) =>
            person.gender === state.algoProposer &&
            person.preferences.length > 0 &&
            person.rejectedBy.length < person.preferences.length &&
            person.match === null
        ).length === 0;
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

const generatePreferences = (partners) => {
  let cutOffSeed = 0.25 + Math.random() * 0.25;
  let valuedPartners = partners.map((partner) => {
    return {
      partner,
      value: cutOffSeed - Math.random(),
    };
  });
  let filteredPartners = valuedPartners.filter((partner) => partner.value >= 0);
  return filteredPartners.map((partner) => partner.partner);
};

const createMarket = (numPeople) => {
  const marketParticipants = getRandomNames(numPeople);
  let market = [];
  market = [
    ...marketParticipants.men.map((man) => {
      return {
        name: man,
        gender: "men",
        preferences: generatePreferences(marketParticipants.women),
        match: null,
        matchMessage: "",
        proposals: [],
        rejectedBy: [],
        className: "",
      };
    }),
  ];

  market = [
    ...market,
    ...marketParticipants.women.map((woman) => {
      return {
        name: woman,
        gender: "women",
        preferences: generatePreferences(marketParticipants.men),
        match: null,
        matchMessage: "",
        proposals: [],
        rejectedBy: [],
        className: "",
      };
    }),
  ];

  return market;
};

const createProposals = (step, state) => {
  const { algoProposer, market } = state;
  const availableSuitors = market.filter(
    (person) =>
      person.gender === algoProposer &&
      person.preferences.length > 0 &&
      person.rejectedBy.length < person.preferences.length &&
      person.match === null
  );

  return market.map((person) => {
    if (availableSuitors.map((suitor) => suitor.name).includes(person.name)) {
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
    if (
      person.gender === algoProposer &&
      person.rejectedBy.length < person.preferences.length
    ) {
      const proposee =
        person.match === null ? person.proposals[0] : person.match;
      const potentialMatch = market.find(
        (newPerson) => newPerson.name === proposee
      );

      if (!potentialMatch.preferences.includes(person.name)) {
        person.matchMessage = `${proposee} rejected my proposal`;
        person.match = null;
        person.rejectedBy.push(proposee);
      } else if (isProposerMatch(person.name, potentialMatch)) {
        if (person.match === null) {
          person.match = person.proposals[0];
          person.matchMessage = `${person.proposals[0]} accepted my proposal`;
        } else {
          person.matchMessage = "";
        }
      } else {
        person.matchMessage = `${proposee} rejected my proposal`;
        person.match = null;
        person.rejectedBy.push(proposee);
      }
    }

    if (person.gender !== algoProposer && person.proposals.length > 0) {
      if (!hasAcceptableMatches(person.preferences, person.proposals)) {
        person.matchMessage = `I rejected all my proposals`;
      } else {
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
        person.rejectedBy = [
          ...new Set([
            ...person.rejectedBy,
            ...person.proposals.filter(
              (props) =>
                props !== newMatch && person.preferences.includes(props)
            ),
          ]),
        ];
        person.match = newMatch;
      }
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

  const myIndex = preferences.indexOf(name);
  const suitorsIndex =
    proposals.length === 0
      ? preferences.length
      : proposals
          .map((suitor) => {
            return preferences.indexOf(suitor) === -1
              ? preferences.length
              : preferences.indexOf(suitor);
          })
          .sort()[0];
  const matchIndex =
    preferences.indexOf(match) >= 0
      ? preferences.indexOf(match)
      : preferences.length;

  return myIndex === Math.min(myIndex, suitorsIndex, matchIndex);
};

const hasAcceptableMatches = (preferences, proposals) => {
  return preferences.filter((value) => proposals.includes(value)).length > 0;
};

const accepteeMatch = (match, suitors, preferences) => {
  const suitorsIndex = suitors
    .map((suitor) => {
      return preferences.indexOf(suitor) === -1
        ? preferences.length
        : preferences.indexOf(suitor);
    })
    .sort()[0];

  const matchIndex =
    preferences.indexOf(match) >= 0
      ? preferences.indexOf(match)
      : preferences.length;

  return preferences[Math.min(suitorsIndex, matchIndex)];
};
