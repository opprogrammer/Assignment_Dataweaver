import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import { bookReducer } from "./reducers";

const rootReducer = { books: bookReducer };

const reducers = combineReducers(rootReducer);

const middlewares = [thunk];

let initialState = {};

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(...middlewares)
);

export { store };
