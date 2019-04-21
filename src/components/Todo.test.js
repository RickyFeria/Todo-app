import React from "react";
import { shallow } from "enzyme";
import Todo from "./Todo";

describe("Todo component", () => {
  it("renders an active todo", () => {
    const activeTodo = shallow(
      <Todo text="active todo" completed={false} onClick={() => {}} />
    );

    expect(activeTodo.text()).toEqual(" active todo");
    expect(activeTodo.props().style.textDecoration).toBe("none");
  });

  it("renders a completed todo", () => {
    const completedTodo = shallow(
      <Todo text="completed todo" completed={true} onClick={() => {}} />
    );

    expect(completedTodo.text()).toEqual(" completed todo");
    expect(completedTodo.props().style.textDecoration).toBe("line-through");
  });
});
