import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./RCategoriesSelectors";
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  createCategoriesSuccess,
  createCategoriesError,
  fetchSelectedCategoriesSuccess,
  fetchSelectedCategoriesError,
  fetchSelectedAttributesSuccess,
  fetchSelectedAttributesError
} from "./RCategoriesActions";

function fetchCategories(params) {
  return get(`/reseller/v1/${params.accountId}/categories`).then(response => {
    return response.json();
  });
}

function* fetchResellerCategories(action) {
  try {
    const id = yield select(accountId);
    let params = {};
    if (action.payload) params = action.payload.params;
    params = { ...params, accountId: id };
    const data = yield call(fetchCategories, params);
    yield put(fetchCategoriesSuccess(data));
  } catch (e) {
    yield put(fetchCategoriesError(e.message));
  }
}

function* fetchResellerCategoriesSaga() {
  yield takeLatest("FETCH_RESELLER_CATEGORIES", fetchResellerCategories);
  yield takeLatest(
    "CREATE_RESELLER_CATEGORIES_SUCCESS",
    fetchResellerCategories
  );
}

function fetchSelectedCategories(params) {
  return get(`/reseller/v1/${params.accountId}/categories/selected`).then(
    response => {
      return response.json();
    }
  );
}

function* fetchResellerSelectedCategories(action) {
  try {
    const id = yield select(accountId);
    const params = { ...action.payload.params, accountId: id };
    const data = yield call(fetchSelectedCategories, params);
    yield put(fetchSelectedCategoriesSuccess(data));
  } catch (e) {
    yield put(fetchSelectedCategoriesError(e.message));
  }
}

function* fetchResellerSelectedCategoriesSaga() {
  yield takeLatest(
    "FETCH_RESELLER_SELECTED_CATEGORIES",
    fetchResellerSelectedCategories
  );
}

function fetchAttributes(params) {
  return get(
    `/reseller/v1/${params.accountId}/attributes/${params.categoryId}`
  ).then(response => {
    return response.json();
  });
}

function* fetchResellerAttributesCategories(action) {
  try {
    const id = yield select(accountId);
    const params = { ...action.payload, accountId: id };
    console.log("params", params, action);
    const data = yield call(fetchAttributes, params);
    yield put(fetchSelectedAttributesSuccess(data));
  } catch (e) {
    yield put(fetchSelectedAttributesError(e.message));
  }
}

function* fetchResellerSelectedAttributesSaga() {
  yield takeLatest(
    "FETCH_RESELLER_SELECTED_ATTRIBUTES",
    fetchResellerAttributesCategories
  );
}

function createCategories(params) {
  return post(`/reseller/v1/${params.accountId}/categories`, params).then(
    response => {
      return response;
    }
  );
}

function* createResellerCategories(action) {
  try {
    const id = yield select(accountId);
    const params = { ...action.payload.params, accountId: id };
    yield call(createCategories, params);
    yield put(createCategoriesSuccess());
  } catch (e) {
    yield put(createCategoriesError(e.message));
  }
}

function* createResellerCategoriesSaga() {
  yield takeLatest("CREATE_RESELLER_CATEGORIES", createResellerCategories);
}

export default function* rootResellerCategoriesSaga() {
  yield all([
    fetchResellerCategoriesSaga(),
    fetchResellerSelectedCategoriesSaga(),
    createResellerCategoriesSaga(),
    fetchResellerSelectedAttributesSaga()
  ]);
}
