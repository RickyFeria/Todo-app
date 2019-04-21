import { combineReducers } from "redux";
import uuidv4 from "uuid/v4";
import * as api from "../../helpers/api";
/*
 * action types
 */
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const REQUEST_TODOS = "REQUEST_TODOS";
const RECEIVE_TODOS = "RECEIVE_TODOS";

export const todoTypes = {
  ADD_TODO,
  TOGGLE_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS
};

/*
 * action creators
 */
export const addTodo = text => ({ type: ADD_TODO, id: uuidv4(), text });

export const toggleTodo = id => ({ type: TOGGLE_TODO, id });

export const requestTodos = filter => ({
  type: REQUEST_TODOS,
  filter
});

export const receiveTodos = (filter, response) => ({
  type: RECEIVE_TODOS,
  filter,
  response
});

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));

/**
 * selectors
 */
export const getVisibleTodos = (state, filter) => {
  const ids = getIds(state.listByFilter[filter]);
  return ids.map(id => getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromListGetIsFetching(state.listByFilter[filter]);

//TODO: reimplement
const fromListGetIsFetching = state => state.isFetching;

export const getTodo = (state, id) => state[id];

export const getIds = state => state.ids;

/*
 * reducers
 */
const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      const nexState = { ...state };
      action.response.forEach(todo => {
        nexState[todo.id] = todo;
      });
      return nexState;
    default:
      return state;
  }
};

const createList = filter => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "RECEIVE_TODOS":
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_TODOS":
        return true;
      case "RECEIVE_TODOS":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  });
};

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;
