import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";
import nextId from "./nextId";

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  nextId
});

export default rootReducer;
