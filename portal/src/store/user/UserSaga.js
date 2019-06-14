import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchUserError, fetchUserSuccess } from './UserActions'
import { get } from './../../utils/RestUtils'

//const delayReject = time => new Promise((_, reject) => setTimeout(() => { 
//  reject(new Error('You provided invalid creds.'))
//}, time));

//const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));

const getUser = () => {

  return get("/account/v1/user")
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

function* fetchUser(action) {
  try {
    const data = yield call(getUser)

    if (data.resellers.length > 0) {
      
    }

    yield put(fetchUserSuccess(data));
  } catch (e) {
    yield put(fetchUserError(e));
  }
}

export function* userSaga(){
  yield takeLatest("FETCH_USER", fetchUser)
}