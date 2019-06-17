import {combineReducers} from 'redux'
import UserReducer, { initialUserState } from './user/UserReducer';
import AuthReducer, {initialAuthState} from './authorization/AuthReducer';
import UserAccountsReducer, { initialUserAccountState } from './accounts/UserAccountsReducer';


export const initialStoreState = {
  user: initialUserState,
  auth: initialAuthState,
  userAccount: initialUserAccountState
}

const appReducer =  combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  userAccount: UserAccountsReducer
})

export default (state, action) => {

  // Initialize state on logout.
  if (action.type === 'SUBMIT_LOGOUT_SUCCESS') {
    state = {
      ...initialStoreState,
      auth: {
        ...initialAuthState,
        token: null
      }
    }
  }
  
  return appReducer(state, action)
}