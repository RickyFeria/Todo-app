//import { combineReducers } from "redux";
import todos, * as fromTodos from "./todos";

export default todos; //combineReducers({ todos });

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state, filter);

export const getIsFetching = (state, filter) =>
  fromTodos.getIsFetching(state, filter);
