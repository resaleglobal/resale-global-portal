import { call, put, takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get } from "../../../utils/RestUtils";
import { accountId } from "./AdminUsersSelectors";
import { fetchUserSuccess, fetchUserError } from "./AdminUsersActions";

function fetch(accountId) {
  console.log(accountId);
  return get(`/admin/v1/${accountId}/users`).then(response => {
    return response.json();
  });
}

function* fetchAdminUsers(_) {
  try {
    const id = yield select(accountId);
    const data = yield call(fetch, id);
    yield put(fetchUserSuccess(data));
  } catch (e) {
    yield put(fetchUserError(e.message));
  }
}

export function* fetchAdminUsersSaga() {
  yield takeLatest("FETCH_ADMIN_USERS", fetchAdminUsers);
}
