import { combineReducers } from "redux";

//Reducers.
import auth from "./AuthReducers";
import questions from "./QuestionReducer";

export default combineReducers({
  auth,
  questions
});
