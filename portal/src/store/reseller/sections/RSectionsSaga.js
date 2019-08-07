import { call, put, takeLatest, all } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./RSectionsSelectors";
import { fetchSectionsSuccess, fetchSectionsError, fetchDropdownSectionsSuccess, fetchDropdownSectionsError, createSectionsSuccess, createSectionsError } from "./RSectionsActions";

function fetchSections(params) {
  return get(`/reseller/v1/${params.accountId}/sections`).then(response => {
    return response.json();
  });
}

function* fetchResellerSections(action) {
  try {
    const id = yield select(accountId);
    const params = {accountId: id}
    const data = yield call(fetchSections, params);
    yield put(fetchSectionsSuccess(data));
  } catch (e) {
    yield put(fetchSectionsError(e.message));
  }
}

function* fetchResellerSectionsSaga() {
  yield takeLatest("FETCH_RESELLER_SECTIONS", fetchResellerSections);
  yield takeLatest("CREATE_RESELLER_SECTIONS_SUCCESS", fetchResellerSections);
}

function fetchDropdownSections(params) {
  let paramString = ""
  if (params.departmentId) {
    paramString = `?departmentId=${params.departmentId}`
  }
  return get(`/reseller/v1/${params.accountId}/sections${paramString}`).then(response => {
    return response.json();
  });
}

function* fetchResellerDropdownSections(action) {
  try {
    console.log(action.payload)
    const id = yield select(accountId);
    const params = {...action.payload.params, accountId: id}
    const data = yield call(fetchDropdownSections, params);
    yield put(fetchDropdownSectionsSuccess(data));
  } catch (e) {
    yield put(fetchDropdownSectionsError(e.message));
  }
}

function* fetchResellerDropdownSectionsnSaga() {
  yield takeLatest("FETCH_RESELLER_DROPDOWN_SECTIONS", fetchResellerDropdownSections);
}

function createSections(params) {
  return post(`/reseller/v1/${params.accountId}/sections`, params).then(response => {
    return response
  });
}

function* createResellerSections(action) {
  try {
    const id = yield select(accountId);
    const params = {...action.payload.params, accountId: id}
    yield call(createSections, params);
    yield put(createSectionsSuccess());
  } catch (e) {
    yield put(createSectionsError(e.message));
  }
}

function* createResellerSectionsSaga() {
  yield takeLatest("CREATE_RESELLER_SECTIONS", createResellerSections);
}

export default function* rootResellerSectionsSaga() {
  yield all([
    fetchResellerSectionsSaga(),
    createResellerSectionsSaga(),
    fetchResellerDropdownSectionsnSaga()
  ])
}