import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actions } from "../redux/ducks/todos";
import TodoList from "../components/TodoList";
import FetchError from "../components/FetchError";
import {
	getVisibleTodos,
	getIsFetching,
	getErrorMessage
} from "../redux/ducks";

const VisibleTodoList = ({
	toggleTodo,
	errorMessage,
	todos,
	isFetching,
	filter,
	fetchTodos
}) => {
	const fetchData = useCallback(() => {
		fetchTodos(filter);
	}, [fetchTodos, filter]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (isFetching && !todos.length) {
		return <p>loading...</p>;
	}
	if (errorMessage && !todos.length) {
		return <FetchError message={errorMessage} onRetry={() => fetchData()} />;
	}
	return <TodoList todos={todos} onTodoClick={toggleTodo} />;
};

const mapStateToProps = (state, { match: { params } }) => {
	const filter = params.filter || "all";
	return {
		todos: getVisibleTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		errorMessage: getErrorMessage(state, filter),
		filter
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		actions
	)(VisibleTodoList)
);
