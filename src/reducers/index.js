import { combineReducers } from "redux";
import todos, * as fromTodos from "./todos";
// getVisibleTodos from todos.js must be namespaced to prevent a collision with the getVisibleTodos in this file
import nextId from "./nextId";

const rootReducer = combineReducers({
  todos,
  nextId
});

export default rootReducer;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
