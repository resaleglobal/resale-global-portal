import { call, put, takeLatest } from "redux-saga/effects";
import { loginError, loginSuccess, submitLogoutSuccess } from "./AuthActions";
import { postNonAuth } from "../../utils/RestUtils";
import { AUTH_TOKEN } from "./AuthReducer";

//const delayReject = time => new Promise((_, reject) => setTimeout(() => {
//  reject(new Error('You provided invalid creds.'))
//}, time));

//const delayResolve = time => new Promise((resolve) => setTimeout(() => resolve('token'), time));

const login = params => {
  return postNonAuth("/account/v1/auth/login", params).then(response => {
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("Invalid credentials provided.");
        default:
          throw new Error("Something bad happened!");
      }
    }

    return response.json();
  });
};

function* submitLogin(action) {
  try {
    const resp = yield call(login, action.payload.params);
    yield put(loginSuccess(resp.token));
  } catch (e) {
    yield put(loginError(e.message));
  }
}

export function* loginSaga() {
  yield takeLatest("SUBMIT_LOGIN", submitLogin);
}

const delayResolveStorageClean = time =>
  new Promise(resolve =>
    setTimeout(() => {
      localStorage.removeItem(AUTH_TOKEN);
      resolve();
    }, time)
  );

/**
 * Using an empty setTimeout to force logot success to the back of the saga call stack.
 */
function* submitLogout(_) {
  yield call(delayResolveStorageClean, 0);
  yield put(submitLogoutSuccess());
}

export function* logoutSaga() {
  yield takeLatest("SUBMIT_LOGOUT", submitLogout);
}
