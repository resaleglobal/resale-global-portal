import { call, put, takeLatest } from 'redux-saga/effects'
import { createResellerSuccess, createResellerFailure } from './UserAccountsActions';
import { post } from '../../utils/RestUtils';

const postReseller = (params) => {
  return post("/account/v1/reseller", params)
    .then(response => {
      return response.json()
  })
}

function* createReseller(action) {
  try {
    const data = yield call(postReseller, action.payload.params)
    yield put(createResellerSuccess(data));
  } catch (e) {
    yield put(createResellerFailure(e.message));
  }
}

export function* createResellerSaga(){
  yield takeLatest("CREATE_RESELLER", createReseller)
}