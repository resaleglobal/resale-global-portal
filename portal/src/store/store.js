import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { loginSaga, logoutSaga } from "./authorization/AuthSagas";
import { userSaga } from "./user/UserSaga";
import {
  createResellerSaga,
  createConsignorSaga
} from "./accounts/UserAccountsSagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
middlewares.push(logger);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(createResellerSaga);
sagaMiddleware.run(createConsignorSaga);
sagaMiddleware.run(logoutSaga);

export default store;
