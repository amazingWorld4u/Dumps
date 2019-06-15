import Service from "services";
import * as urls from "services/constants";
import types from "../types";

// Get all series.
const getAllSeries = () => {
  return async dispatch => {
    dispatch({ type: types.SET_LOADING, payload: { home: true } });
    try {
      let res = await Service({ url: urls.getAllSeries });
      dispatch({ type: types.SET_ALL_SERIES, payload: res.data });
      return;
    } catch (e) {
    } finally {
      dispatch({ type: types.SET_LOADING, payload: { home: false } });
    }
  };
};

// Get question details.
const getAllQuestions = seriesID => {
  return async dispatch => {
    dispatch({ type: types.SET_LOADING, payload: { all_question: true } });
    try {
      let res = await Service({ url: urls.getQuestionDetail + seriesID });
      let arr = [];
      let allIds = new Set(res.data.map(e => e.QuestionID));
      res = [...allIds].reduce((acc, value) => {
        return acc.concat([res.data.filter(e => e.QuestionID === value)]);
      }, []);
      dispatch({
        type: types.SET_ALL_QUESTION,
        payload: res
      });
    } catch (e) {
    } finally {
      dispatch({ type: types.SET_LOADING, payload: { all_question: false } });
    }
  };
};

export { getAllSeries, getAllQuestions };
