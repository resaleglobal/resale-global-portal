import { call, put, takeLatest } from "redux-saga/effects";
import {
  createResellerSuccess,
  createResellerFailure,
  createConsignorSuccess,
  createConsignorFailure,
  selectAccount
} from "./UserAccountsActions";
import { post } from "../../utils/RestUtils";

const postReseller = params => {
  return post("/account/v1/reseller", params).then(response => {
    return response.json();
  });
};

function* createReseller(action) {
  try {
    const data = yield call(postReseller, action.payload.params);
    yield put(createResellerSuccess(data));
    yield put(
      selectAccount({
        type: "RESELLER",
        id: data.reseller.id,
        domain: data.reseller.domain
      })
    );
  } catch (e) {
    yield put(createResellerFailure(e.message));
  }
}

export function* createResellerSaga() {
  yield takeLatest("CREATE_RESELLER", createReseller);
}

const postConsignor = params => {
  return post("/account/v1/consignor", params).then(response => {
    return response.json();
  });
};

function* createConsignor(action) {
  try {
    const data = yield call(postConsignor, action.payload.params);
    yield put(createConsignorSuccess(data));
  } catch (e) {
    yield put(createConsignorFailure(e.message));
  }
}

export function* createConsignorSaga() {
  yield takeLatest("CREATE_CONSIGNOR", createConsignor);
}
