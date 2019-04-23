//import { combineReducers } from "redux";
import todos, { selectors as todosSelectors } from "./todos";

export default todos; //combineReducers({ todos });

export const getVisibleTodos = (state, filter) =>
	todosSelectors.getVisibleTodos(state, filter);

export const getIsFetching = (state, filter) =>
	todosSelectors.getIsFetching(state, filter);

export const getErrorMessage = (state, filter) =>
	todosSelectors.getErrorMessage(state, filter);
