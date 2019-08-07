import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { loginSaga, logoutSaga, createShopifyUserSaga, registerInvitedUserSaga, registerInvitedConsignorSaga } from "./authorization/AuthSagas";
import { userSaga } from "./user/UserSaga";
import {
  createResellerSaga,
  createConsignorSaga
} from "./accounts/UserAccountsSagas";
import { fetchAdminUsersSaga, inviteUserSaga } from "./admin/users/AdminUsersSaga";
import { inviteConsignorSaga, fetchResellerConsignorsSaga } from "./reseller/consignors/RConsignorsSaga";
import { fetchResellerItemsSaga, createResellerItemsSaga } from "./reseller/items/RItemsSaga"
import rootResellerCategoriesSaga from "./reseller/categories/RCategoriesSaga";
import rootResellerDepartmentsSaga from "./reseller/departments/RDepartmentsSaga";
import rootResellerSectionsSaga from "./reseller/sections/RSectionsSaga";
import rootResellerAttributesSaga from "./reseller/attributes/RAttributesSaga"

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
sagaMiddleware.run(fetchAdminUsersSaga);
sagaMiddleware.run(createShopifyUserSaga)
sagaMiddleware.run(inviteUserSaga)
sagaMiddleware.run(inviteConsignorSaga)
sagaMiddleware.run(fetchResellerConsignorsSaga);
sagaMiddleware.run(registerInvitedUserSaga)
sagaMiddleware.run(registerInvitedConsignorSaga)
sagaMiddleware.run(fetchResellerItemsSaga);
sagaMiddleware.run(createResellerItemsSaga)
sagaMiddleware.run(rootResellerCategoriesSaga)
sagaMiddleware.run(rootResellerDepartmentsSaga)
sagaMiddleware.run(rootResellerSectionsSaga)
sagaMiddleware.run(rootResellerAttributesSaga)

export default store;
