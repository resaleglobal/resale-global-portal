import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./RDepartmentsSelectors";
import { fetchDepartmentsSuccess, fetchDepartmentsError, createDepartmentsSuccess, createDepartmentsError } from "./RDepartmentsActions";

function fetchDepartments(params) {
  return get(`/reseller/v1/${params.accountId}/departments`).then(response => {
    return response.json();
  });
}

function* fetchResellerDepartments(action) {
  try {
    const id = yield select(accountId);
    const params = {accountId: id}
    const data = yield call(fetchDepartments, params);
    yield put(fetchDepartmentsSuccess(data));
  } catch (e) {
    yield put(fetchDepartmentsError(e.message));
  }
}

function* fetchResellerDepartmentsSaga() {
  yield takeLatest("FETCH_RESELLER_DEPARTMENTS", fetchResellerDepartments);
  yield takeLatest("CREATE_RESELLER_DEPARTMENTS_SUCCESS", fetchResellerDepartments);
}

function createDepartments(params) {
  return post(`/reseller/v1/${params.accountId}/departments`, params).then(response => {
    console.log(response)
    return response
  });
}

function* createResellerDepartments(action) {
  try {
    const id = yield select(accountId);
    const params = {...action.payload.params, accountId: id}
    yield call(createDepartments, params);
    yield put(createDepartmentsSuccess());
  } catch (e) {
    console.log(e)
    yield put(createDepartmentsError(e.message));
  }
}

function* createResellerDepartmentsSaga() {
  yield takeLatest("CREATE_RESELLER_DEPARTMENTS", createResellerDepartments);
}

export default function* rootResellerDepartmentsSaga() {
  yield all([
    fetchResellerDepartmentsSaga(),
    createResellerDepartmentsSaga()
  ])
}