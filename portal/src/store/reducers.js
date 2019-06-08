import {combineReducers} from 'redux'
import UserReducer, { initialUserState } from './user/UserReducer';


export const initialStoreState = {
  user: initialUserState,
}

export default combineReducers({
  user: UserReducer,
})