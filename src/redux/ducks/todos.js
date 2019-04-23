import { combineReducers } from "redux";
import { normalize, schema } from "normalizr";
import * as api from "../../helpers/api";

/**
 * schema
 */

const todoSchema = new schema.Entity("todos");
const todoListSchema = new schema.Array(todoSchema);

/*
 * action types
 */
const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
const ADD_TODOS_REQUEST = "ADD_TODOS_REQUEST";
const ADD_TODOS_SUCCESS = "ADD_TODOS_SUCCESS";
const ADD_TODOS_FAILURE = "ADD_TODOS_FAILURE";
const TOGGLE_TODOS_REQUEST = "TOGGLE_TODOS_REQUEST";
const TOGGLE_TODOS_SUCCESS = "TOGGLE_TODOS_SUCCESS";
const TOGGLE_TODOS_FAILURE = "TOGGLE_TODOS_FAILURE";

export const todoTypes = {
	FETCH_TODOS_REQUEST,
	FETCH_TODOS_SUCCESS,
	FETCH_TODOS_FAILURE,
	ADD_TODOS_REQUEST,
	ADD_TODOS_SUCCESS,
	ADD_TODOS_FAILURE,
	TOGGLE_TODOS_REQUEST,
	TOGGLE_TODOS_SUCCESS,
	TOGGLE_TODOS_FAILURE
};

/*
 * action creators
 */
const fetchTodos = filter => async (dispatch, getState) => {
	if (getIsFetching(getState(), filter)) {
		return Promise.resolve();
	}
	dispatch({
		type: FETCH_TODOS_REQUEST,
		filter
	});
	try {
		const response = await api.fetchTodos(filter);
		dispatch({
			type: FETCH_TODOS_SUCCESS,
			filter,
			response: normalize(response, todoListSchema)
		});
	} catch (error) {
		dispatch({
			type: FETCH_TODOS_FAILURE,
			filter,
			message: error.message || "Something went wrong"
		});
	}
};

const addTodo = text => async dispatch => {
	dispatch({
		type: ADD_TODOS_REQUEST
	});
	try {
		const response = await api.addTodo(text);
		dispatch({
			type: ADD_TODOS_SUCCESS,
			response: normalize(response, todoSchema)
		});
	} catch (error) {
		dispatch({
			type: ADD_TODOS_FAILURE,
			message: error.message || "Something went wrong"
		});
	}
};

const toggleTodo = id => async dispatch => {
	dispatch({
		type: TOGGLE_TODOS_REQUEST
	});
	try {
		const response = await api.toggleTodo(id);
		dispatch({
			type: TOGGLE_TODOS_SUCCESS,
			response: normalize(response, todoSchema)
		});
	} catch (error) {
		dispatch({
			type: TOGGLE_TODOS_FAILURE,
			message: error.message || "Something went wrong"
		});
	}
};

// actions
export const actions = {
	fetchTodos,
	addTodo,
	toggleTodo
};

/**
 * selectors
 */
const getVisibleTodos = (state, filter) => {
	const ids = getIds(state.listByFilter[filter]);
	return ids.map(id => getTodo(state.byId, id));
};

const getIsFetching = (state, filter) => state.listByFilter[filter].isFetching;

const getErrorMessage = (state, filter) =>
	state.listByFilter[filter].errorMessage;

const getTodo = (state, id) => state[id];

const getIds = state => state.ids;

export const selectors = {
	getVisibleTodos,
	getIsFetching,
	getErrorMessage,
	getTodo,
	getIds
};

/*
 * reducers
 */
const byId = (state = {}, action) => {
	if (action.response) {
		return {
			...state,
			...action.response.entities.todos
		};
	}
	return state;
};

const createList = filter => {
	const handleToggle = (state, action) => {
		const { result: toggleId, entities } = action.response;
		const { completed } = entities.todos[toggleId];
		const shouldRemove =
			(completed && filter === "active") ||
			(!completed && filter === "completed");
		return shouldRemove ? state.filter(id => id !== toggleId) : state;
	};

	const ids = (state = [], action) => {
		switch (action.type) {
			case "FETCH_TODOS_SUCCESS":
				return filter === action.filter ? action.response.result : state;
			case "ADD_TODOS_SUCCESS":
				return filter !== "completed"
					? [...state, action.response.result]
					: state;
			case "TOGGLE_TODOS_SUCCESS":
				return handleToggle(state, action);
			default:
				return state;
		}
	};

	const isFetching = (state = false, action) => {
		if (action.filter !== filter) {
			return state;
		}
		switch (action.type) {
			case "FETCH_TODOS_REQUEST":
				return true;
			case "FETCH_TODOS_SUCCESS":
			case "FETCH_TODOS_FAILURE":
				return false;
			default:
				return state;
		}
	};

	const errorMessage = (state = null, action) => {
		if (action.filter !== filter) {
			return state;
		}
		switch (action.type) {
			case "FETCH_TODOS_FAILURE":
				return action.message;
			case "FETCH_TODOS_REQUEST":
			case "FETCH_TODOS_SUCCESS":
				return null;
			default:
				return state;
		}
	};

	return combineReducers({
		ids,
		isFetching,
		errorMessage
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
