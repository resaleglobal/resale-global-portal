import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'
import { initialStoreState } from './reducers';

const asyncReducer = (state = initialStoreState, action) => state;

const middlewares = [thunk]
middlewares.push(logger)
const store = createStore(asyncReducer,
  composeWithDevTools(applyMiddleware(...middlewares)));

export default store;