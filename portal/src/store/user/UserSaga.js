import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchUserError, fetchUserSuccess } from './UserActions'

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));

function* fetchUser(action) {
  try {
     const data = yield call(delayResolve, 1000)
     yield put(fetchUserSuccess(data));
  } catch (e) {
     yield put(fetchUserError(e.message));
  }
}

export function* userSaga(){
  yield takeLatest("FETCH_USER", fetchUser)
}