import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./ducks";

export const configureStore = () => {
	const middlewares = [thunk];
	if (process.env.NODE_ENV !== "production") {
		middlewares.push(logger);
	}
	return createStore(rootReducer, applyMiddleware(...middlewares));
};
