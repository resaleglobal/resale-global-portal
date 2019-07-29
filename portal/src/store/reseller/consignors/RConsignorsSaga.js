import { call, put, takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./RConsignorsSelectors";
import { fetchConsignorsSuccess, fetchConsignorsError, submitInviteConsignorSuccess, submitInviteConsignorError } from "./RConsignorsActions";

function fetch(accountId) {
  return get(`/reseller/v1/${accountId}/consignor`).then(response => {
    return response.json();
  });
}

function* fetchResellerConsignors(_) {
  try {
    const id = yield select(accountId);
    const data = yield call(fetch, id);
    yield put(fetchConsignorsSuccess(data));
  } catch (e) {
    yield put(fetchConsignorsError(e.message));
  }
}

export function* fetchResellerConsignorsSaga() {
  yield takeLatest("FETCH_RESELLER_CONSIGNORS", fetchResellerConsignors);
  yield takeLatest("SUBMIT_INVITE_CONSIGNOR_SUCCESS", fetchResellerConsignors)
}

function fetchInvite(params) {
  return post(`/reseller/v1/${params.id}/consignor`, params).then(response => {
    return response.json();
  });
}

function* inviteConsignor(action) {
  try {
    const id = yield select(accountId);
    const data = yield call(fetchInvite, { ...action.payload.params, id } );
    console.log(data.url)
    yield put(submitInviteConsignorSuccess());
  } catch (e) {
    yield put(submitInviteConsignorError(e.message));
  }
}

export function* inviteConsignorSaga() {
  yield takeLatest("SUBMIT_INVITE_CONSIGNOR", inviteConsignor)
}