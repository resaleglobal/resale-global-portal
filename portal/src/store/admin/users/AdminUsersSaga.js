import { call, put, takeLatest } from "redux-saga/effects";
import { select } from "redux-saga/effects";

import { get, post } from "../../../utils/RestUtils";
import { accountId } from "./AdminUsersSelectors";
import { fetchUserSuccess, fetchUserError, submitInviteUserSuccess, submitInviteUserError } from "./AdminUsersActions";

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
  yield takeLatest("SUBMIT_INVITE_USER_SUCCESS", fetchAdminUsers)
}

function fetchInvite(params) {
  return post(`/admin/v1/${params.id}/user`, params).then(response => {
    return response.json();
  });
}

function* inviteUser(action) {
  try {
    const id = yield select(accountId);
    const data = yield call(fetchInvite, { ...action.payload.params, id } );
    console.log(data.url)
    yield put(submitInviteUserSuccess());
  } catch (e) {
    yield put(submitInviteUserError(e.message));
  }
}

export function* inviteUserSaga() {
  yield takeLatest("SUBMIT_INVITE_USER", inviteUser)
}