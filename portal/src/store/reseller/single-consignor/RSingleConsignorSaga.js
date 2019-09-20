import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get } from "../../../utils/RestUtils";
import { accountId } from "./RSingleConsignorSelectors";

import {
  fetchSingleConsignorError,
  fetchSingleConsignorSuccess
} from "./RSingleConsignorActions";

function fetch(params) {
  return get(
    `/reseller/v1/${params.accountId}/consignors/${params.consignorId}`
  ).then(response => {
    return response.json();
  });
}

function* fetchResellerSingleConsignor(action) {
  try {
    const id = yield select(accountId);
    const params = { ...action.payload.params, accountId: id };
    console.log(params);
    const data = yield call(fetch, params);
    yield put(fetchSingleConsignorSuccess(data));
  } catch (e) {
    yield put(fetchSingleConsignorError(e.message));
  }
}

function* fetchResellerSingleIremSaga() {
  yield takeLatest(
    "FETCH_RESELLER_SINGLE_CONSIGNOR",
    fetchResellerSingleConsignor
  );
}

export default function* rootResellerSingleConsignorSaga() {
  yield all([fetchResellerSingleIremSaga()]);
}
