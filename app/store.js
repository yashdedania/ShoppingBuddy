import {createStore, combineReducers, applyMiddleware} from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import {createPromise} from 'redux-promise-middleware';
import userReducer from "./src/reducers/userReducer";

const promise = createPromise({ types: { fulfilled: 'success' } });
const logger = createLogger();

const store = createStore(
	combineReducers({
		user:userReducer
	}), 
	{}, 
	applyMiddleware(logger, thunk, promise)
);

export default store;
