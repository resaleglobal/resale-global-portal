import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchUserError, fetchUserSuccess } from './UserActions'
import store from './../store';

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

//const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));

const getUser = () => {

  const token = store.getState().auth.token

  return fetch("http://localhost:8000/account/v1/user", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(response => {
    console.log(response)
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

function* fetchUser(action) {
  try {
     const data = yield call(getUser)
     yield put(fetchUserSuccess(data));
  } catch (e) {
    yield put(fetchUserSuccess(e));
  }
}

export function* userSaga(){
  yield takeLatest("FETCH_USER", fetchUser)
}