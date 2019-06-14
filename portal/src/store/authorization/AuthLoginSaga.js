import { call, put, takeLatest } from 'redux-saga/effects'
import {loginError, loginSuccess} from './AuthActions'
import { postNonAuth } from '../../utils/RestUtils';

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

// const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));


const login = (params) => {
  return postNonAuth("/account/v1/auth/login", params)
    .then(response => {

      if (!response.ok) {
        switch(response.status) {
          case 401:
            throw new Error('Invalid credentials provided.')
           default:
             throw new Error('Something bad happened!')
        }
      }

      return response.json()

    })
}


function* submitLogin(action) {
  try {
     const resp = yield call(login, action.payload.params)
     yield put(loginSuccess(resp.token));
  } catch (e) {
     yield put(loginError(e.message));
  }
}

export function* loginSaga(){
  yield takeLatest("SUBMIT_LOGIN", submitLogin)
}