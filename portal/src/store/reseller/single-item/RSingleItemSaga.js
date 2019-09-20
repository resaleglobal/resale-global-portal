import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get } from "../../../utils/RestUtils";
import { accountId } from "./RSingleItemSelectors";

import {
  fetchSingleItemError,
  fetchSingleItemSuccess
} from "./RSingleItemActions";

function fetch(params) {
  return get(`/reseller/v1/${params.accountId}/items/${params.itemId}`).then(
    response => {
      return response.json();
    }
  );
}

function* fetchResellerSingleItem(action) {
  try {
    const id = yield select(accountId);
    const params = { ...action.payload.params, accountId: id };
    console.log(params);
    const data = yield call(fetch, params);
    yield put(fetchSingleItemSuccess(data));
  } catch (e) {
    yield put(fetchSingleItemError(e.message));
  }
}

function* fetchResellerSingleIremSaga() {
  yield takeLatest("FETCH_RESELLER_SINGLE_ITEM", fetchResellerSingleItem);
}

export default function* rootResellerSingleItemSaga() {
  yield all([fetchResellerSingleIremSaga()]);
}
