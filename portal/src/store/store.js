import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import { loginSaga } from "./authorization/AuthLoginSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
middlewares.push(logger)

const store = createStore(reducers,
  composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(loginSaga)

export default store;