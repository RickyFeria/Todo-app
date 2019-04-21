/*
import deepFreeze from "deep-freeze-strict";
import uuidv4 from "uuid/v4";
import todos, { addTodo, toggleTodo, todoTypes } from "../../ducks/todos";


describe("Action creator", () => {
  it("should create an ADD_TODO action", () => {
    const text = "Test TODO";
    expect(addTodo(text)).toEqual({
      type: todoTypes.ADD_TODO,
      id: text
    });
  });

  it("should create a TOGGLE_TODO action", () => {
    const id = uuidv4();
    expect(toggleTodo(id)).toEqual({
      type: todoTypes.TOGGLE_TODO,
      id
    });
  });
});

describe("Reducer", () => {
  it("should return the initial state", () => {
    expect(todos(undefined, {})).toEqual({
      byId: {},
      allIds: []
    });
  });

  it("should add new todo in the todos list", () => {
    const text = "New todo";
    const action = addTodo(text);
    const emptyTodoList = [];
    const notEmptyTodoList = [{ text: "First todo", completed: false }];
    deepFreeze(emptyTodoList);
    deepFreeze(notEmptyTodoList);
    deepFreeze(action);
    expect(todos(emptyTodoList, action)).toEqual([
      {
        text,
        completed: false
      }
    ]);
    expect(todos(notEmptyTodoList, action)).toEqual([
      ...notEmptyTodoList,
      {
        text,
        completed: false
      }
    ]);
  });

  it("should toggle todo's completed state", () => {
    const index = 0;
    const action = toggleTodo(index);
    const activeTodo = [
      {
        text: "Toggled todo",
        completed: false
      }
    ];
    const CompletedTodo = [
      {
        text: "Toggled todo",
        completed: true
      }
    ];
    deepFreeze(activeTodo);
    deepFreeze(CompletedTodo);
    deepFreeze(action);
    expect(todos(activeTodo, action)).toEqual([
      {
        text: "Toggled todo",
        completed: true
      }
    ]);
    expect(todos(CompletedTodo, action)).toEqual([
      {
        text: "Toggled todo",
        completed: false
      }
    ]);
  });
});
*/
