import {combineReducers} from 'redux'
import UserReducer, { initialUserState } from './user/UserReducer';
import AuthReducer, {initialAuthState} from './authorization/AuthReducer';


export const initialStoreState = {
  user: initialUserState,
  auth: initialAuthState
}

export default combineReducers({
  user: UserReducer,
  auth: AuthReducer
})