import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get } from "../../../utils/RestUtils";
import { accountId } from "./RAttributesSelectors";
import { fetchAttributesSuccess, fetchAttributesError } from "./RAttributesActions";

function fetchAttributes(params) {
  return get(`/reseller/v1/${params.accountId}/attributes`).then(response => {
    return response.json();
  });
}

function* fetchResellerAttributes(_) {
  try {
    const id = yield select(accountId);
    const params = {accountId: id}
    const data = yield call(fetchAttributes, params);
    yield put(fetchAttributesSuccess(data));
  } catch (e) {
    yield put(fetchAttributesError(e.message));
  }
}

function* fetchResellerAttributesSaga() {
  yield takeLatest("FETCH_RESELLER_ATTRIBUTES", fetchResellerAttributes);
}

export default function* rootResellerAttributesSaga() {
  yield all([
    fetchResellerAttributesSaga(),
  ])
}