import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import logger from "redux-logger";
import rootReducer from "./ducks";

export const configureStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }
  return createStore(rootReducer, applyMiddleware(...middlewares));
};
