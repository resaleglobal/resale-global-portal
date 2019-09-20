import { combineReducers } from "redux";
import UserReducer, { initialUserState } from "./user/UserReducer";
import AuthReducer, { initialAuthState } from "./authorization/AuthReducer";
import UserAccountsReducer, {
  initialUserAccountState
} from "./accounts/UserAccountsReducer";
import AdminUsersReducer, {
  initialAdminUsersState
} from "./admin/users/AdminUsersReducer";
import RConsignorsReducer, {
  initialResellerConsignorsState
} from "./reseller/consignors/RConsignorsReducer";
import RItemsReducer, {
  initialResellerItemsState
} from "./reseller/items/RItemsReducer";
import RCategoriesReducer, {
  initialResellerCategoriesState
} from "./reseller/categories/RCategoriesReducer";
import RDepartmentsReducer, {
  initialResellerDepartmentsState
} from "./reseller/departments/RDepartmentsReducer";
import RSectionsReducer, {
  initialResellerSectionsState
} from "./reseller/sections/RSectionsReducer";
import RAttributesReducer, {
  initialResellerAttributesState
} from "./reseller/attributes/RAttributesReducer";
import RSingleItemReducer, {
  initialResellerSingleItemState
} from "./reseller/single-item/RSingleItemReducer";
import RSingleConsignorReducer, {
  initialResellerSingleConsignorState
} from "./reseller/single-consignor/RSingleConsignorReducer";

export const initialStoreState = {
  user: initialUserState,
  auth: initialAuthState,
  userAccount: initialUserAccountState,
  adminUsers: initialAdminUsersState,
  rConsignors: initialResellerConsignorsState,
  rItems: initialResellerItemsState,
  rSingleItem: initialResellerSingleItemState,
  rCategories: initialResellerCategoriesState,
  rDepartments: initialResellerDepartmentsState,
  rSections: initialResellerSectionsState,
  rAttributes: initialResellerAttributesState,
  rSingleConsignor: initialResellerSingleConsignorState
};

const appReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  userAccount: UserAccountsReducer,
  adminUsers: AdminUsersReducer,
  rConsignors: RConsignorsReducer,
  rSingleConsignor: RSingleConsignorReducer,
  rItems: RItemsReducer,
  rSingleItem: RSingleItemReducer,
  rCategories: RCategoriesReducer,
  rDepartments: RDepartmentsReducer,
  rSections: RSectionsReducer,
  rAttributes: RAttributesReducer
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
