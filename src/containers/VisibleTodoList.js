import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../redux/ducks/todos";
import TodoList from "../components/TodoList";
import { getVisibleTodos, getIsFetching } from "../redux/ducks";

class VisibleTodoList extends React.Component {
  componentDidMount = () => {
    this.fetchData();
  };
  componentDidUpdate = prevProps => {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  };
  fetchData = () => {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  };
  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>loading...</p>;
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    actions
  )(VisibleTodoList)
);

export default VisibleTodoList;
