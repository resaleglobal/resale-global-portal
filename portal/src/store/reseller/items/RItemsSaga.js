import { call, put, takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./RItemsSelectors";
import { fetchItemsSuccess, fetchItemsError, createItemsSuccess, createItemsError } from "./RItemsActions";

function fetch(params) {
  return get(`/reseller/v1/${params.accountId}/items`).then(response => {
    return response.json();
  });
}

function* fetchResellerItems(action) {
  try {
    const id = yield select(accountId);
    const params = {...action.payload.params, accountId: id}
    const data = yield call(fetch, params);
    yield put(fetchItemsSuccess(data));
  } catch (e) {
    yield put(fetchItemsError(e.message));
  }
}

export function* fetchResellerItemsSaga() {
  yield takeLatest("FETCH_RESELLER_ITEMS", fetchResellerItems);
}


function create(params) {
  return post(`/reseller/v1/${params.accountId}/items`, params).then(response => {
    return response.json();
  });
}

function* createResellerItems(action) {
  try {
    const id = yield select(accountId);
    const params = {...action.payload.params, accountId: id}
    yield call(create, params);
    yield put(createItemsSuccess());
  } catch (e) {
    yield put(createItemsError(e.message));
  }
}

export function* createResellerItemsSaga() {
  yield takeLatest("CREATE_RESELLER_ITEMS", createResellerItems);
}

