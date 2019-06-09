import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers';

const middlewares = [thunk]
middlewares.push(logger)
const store = createStore(reducers,
  composeWithDevTools(applyMiddleware(...middlewares)));

export default store;