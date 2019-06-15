/**
 * Questions state management.
 */
import types from "../types";

const initState = {
  series: [],
  questionDetails: {},
  allQuestions: [],
  loading: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SET_ALL_SERIES:
      return { ...state, series: action.payload };
    case types.SET_QUESTION_DETAIL:
      return { ...state, questionDetails: action.payload };
    case types.SET_ALL_QUESTION:
      return { ...state, allQuestions: action.payload };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
