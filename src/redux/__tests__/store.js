import deepFreeze from "deep-freeze-strict";
import rootReducer from "../ducks";

describe("Reducer", () => {
  it("should return aplicaion initial state", () => {
    const initialState = {
      byId: {},
      listByFilter: {
        active: { ids: [], isFetching: false },
        all: { ids: [], isFetching: false },
        completed: { ids: [], isFetching: false }
      }
    };
    const action = { type: "none" };
    deepFreeze(initialState);
    deepFreeze(action);
    expect(rootReducer(initialState, action)).toEqual(initialState);
  });
});
