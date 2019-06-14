import { call, put, takeLatest } from 'redux-saga/effects'
import {loginError, loginSuccess} from './AuthActions'

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

// const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));


const login = (params) => {
  return fetch("http://localhost:8000/account/v1/auth/login", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: params.email, password: params.password})
  }).then(response => {

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