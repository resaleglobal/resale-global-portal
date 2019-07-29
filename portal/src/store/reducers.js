import { combineReducers } from "redux";
import UserReducer, { initialUserState } from "./user/UserReducer";
import AuthReducer, { initialAuthState } from "./authorization/AuthReducer";
import UserAccountsReducer, {
  initialUserAccountState
} from "./accounts/UserAccountsReducer";
import AdminUsersReducer, {
  initialAdminUsersState
} from "./admin/users/AdminUsersReducer";
import RConsignorsReducer, { initialResellerConsignorsState } from './reseller/consignors/RConsignorsReducer';
import RItemsReducer, { initialResellerItemsState } from "./reseller/items/RItemsReducer";


export const initialStoreState = {
  user: initialUserState,
  auth: initialAuthState,
  userAccount: initialUserAccountState,
  adminUsers: initialAdminUsersState,
  rConsignors: initialResellerConsignorsState,
  rItems: initialResellerItemsState
};

const appReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  userAccount: UserAccountsReducer,
  adminUsers: AdminUsersReducer,
  rConsignors: RConsignorsReducer,
  rItems: RItemsReducer
});

export default (state, action) => {
  // Initialize state on logout.
  if (action.type === "SUBMIT_LOGOUT_SUCCESS") {
    state = {
      ...initialStoreState,
      auth: {
        ...initialAuthState,
        token: null
      }
    };
  }

  return appReducer(state, action);
};
