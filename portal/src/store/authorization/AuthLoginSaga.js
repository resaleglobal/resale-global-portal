import { call, put, takeLatest } from 'redux-saga/effects'
import {loginError, loginSuccess} from './AuthActions'

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));

function* submitLogin(action) {
  try {
     const data = yield call(delayResolve, 3000)
     yield put(loginSuccess(data));
  } catch (e) {
     yield put(loginError(e.message));
  }
}

export function* loginSaga(){
  yield takeLatest("SUBMIT_LOGIN", submitLogin)
}