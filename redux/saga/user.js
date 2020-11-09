/* eslint-disable camelcase */
// @flow

import { type Saga } from "redux-saga";
import {
  take, call, put, all, takeEvery,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_USER_ASYNC,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGIN_ASYNC,
  LOGIN_SUCCESS,
  SEND_CODE_ASYNC,
  SEND_CODE_RESPONSE,
  VERIFY_CODE_ASYNC,
  VERIFY_CODE_RESPONSE,
  RESET_PASSWORD_ASYNC,
  RESET_PASSWORD_RESPONSE,
  UPDATE_PASSWORD_ASYNC,
  CHANGE_PASSWORD_ASYNC,
  EDIT_ACCOUNT_ASYNC,
  CLOSE_USER_POPUP,
  type TLoginAction,
  type TLogicSuccessAction,
  type TUpdatePasswordAction,
  type TFetchUserAction,
  type TFetchUserSuccessAction,
  type TFetchUserErrorAction,
  type TSendCodeAction,
  type TSendCodeResponseAction,
  type TVerifyCodeAction,
  type TVerifyCodeResponseAction,
  type TResetPasswordAction,
  type TResetPasswordResponseAction,
  type TEditAccountAction,
  type TChangePasswordAction,
  type TClosePopupAction,
  SUCCESS,
  ERROR,
} from "../constants/user";
import { FETCH_ADMIN_LIST_ASYNC, type TFetchAdminListAction } from "../constants/admin";

import { FIREBASE_AUTH_ASYNC, type TFirebaseAuthAction } from "../constants/firebase";


function* fetchUserAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}${api.ADMIN}`, makeHeader()),
    );

    const token = localStorage.getItem("token") || "";
    const firebase_token = localStorage.getItem("firebase_token") || "";

    yield put<TFetchUserSuccessAction>({
      type: FETCH_USER_SUCCESS,
      payload: {
        user: response.data,
        token,
        firebase_token,
      },
    });

    if (!response.data.is_first_time) {
      yield put<TFirebaseAuthAction>({
        type: FIREBASE_AUTH_ASYNC,
        payload: { firebase_token },
      });
    }
  } catch (e) {
    yield put<TFetchUserErrorAction>({ type: FETCH_USER_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* fetchUserWatcher(): Saga<void> {
  yield takeEvery(FETCH_USER_ASYNC, fetchUserAsync);
}


function* loginUserAsync(action: TLoginAction): Saga<void> {
  const { password, email } = action.payload;
  try {
    const response = yield call(
      () => axios.post(`${api.BASE_URL}${api.ADMIN}/login`, { email, password }),
    );

    const { token, firebase_token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("firebase_token", firebase_token);

    yield put<TLogicSuccessAction>({
      type: LOGIN_SUCCESS,
      payload: {
        firebase_token,
        token,
      },
    });

    yield put<TFetchUserAction>({
      type: FETCH_USER_ASYNC,
      payload: {
        token,
      },
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* loginUserWatcher(): Saga<void> {
  while (true) {
    const action: TLoginAction = yield take(LOGIN_ASYNC);
    yield call(loginUserAsync, action);
  }
}


function* sendCodeAsync(action: TSendCodeAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/user/send_code?email=${action.payload.email}`),
    );

    yield put<TSendCodeResponseAction>({
      type: SEND_CODE_RESPONSE,
      payload: {
        response: SUCCESS,
      },
    });
    yield call(showAlert, {
      content: "Code has been sent to your email",
      type: alertTypes.SUCCESS,
    });
  } catch (e) {
    yield put<TSendCodeResponseAction>({
      type: SEND_CODE_RESPONSE,
      payload: {
        response: ERROR,
      },
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* sendCodeWatcher(): Saga<void> {
  while (true) {
    const action: TSendCodeAction = yield take(SEND_CODE_ASYNC);
    yield call(sendCodeAsync, action);
  }
}


function* verifyCodeAsync(action: TVerifyCodeAction): Saga<void> {
  const { email, code } = action.payload;
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/user/check_code?email=${email}&code=${code}`),
    );

    yield put<TVerifyCodeResponseAction>({
      type: VERIFY_CODE_RESPONSE,
      payload: {
        response: SUCCESS,
      },
    });
  } catch (e) {
    yield put<TVerifyCodeResponseAction>({
      type: VERIFY_CODE_RESPONSE,
      payload: {
        response: ERROR,
      },
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* verifyCodeWatcher(): Saga<void> {
  while (true) {
    const action: TVerifyCodeAction = yield take(VERIFY_CODE_ASYNC);
    yield call(verifyCodeAsync, action);
  }
}


function* resetPasswordAsync(action: TResetPasswordAction): Saga<void> {
  const { email, password } = action.payload;
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/user/adm_renew_pwd`, { email, password }),
    );

    yield put<TResetPasswordResponseAction>({
      type: RESET_PASSWORD_RESPONSE,
      payload: {
        response: SUCCESS,
      },
    });
  } catch (e) {
    yield put<TResetPasswordResponseAction>({
      type: RESET_PASSWORD_RESPONSE,
      payload: {
        response: ERROR,
      },
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* resetPasswordWatcher(): Saga<void> {
  while (true) {
    const action = yield take(RESET_PASSWORD_ASYNC);
    yield call(resetPasswordAsync, action);
  }
}


function* updatePasswordAsync(action: TUpdatePasswordAction): Saga<void> {
  const { password, token } = action.payload;
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.ADMIN}/update_password`, { password }, makeHeader(token)),
    );

    yield put<TFetchUserAction>({
      type: FETCH_USER_ASYNC,
      payload: {
        token,
      },
    });
    yield call(showAlert, {
      content: "Password updated",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* updatePasswordWatcher(): Saga<void> {
  while (true) {
    const action: TUpdatePasswordAction = yield take(UPDATE_PASSWORD_ASYNC);
    yield call(updatePasswordAsync, action);
  }
}


function* editAccountAsync(action: TEditAccountAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.ADMIN}/edit_account`, action.payload.formData, makeHeader()),
    );

    const token = localStorage.getItem("token") || "";
    yield put<TClosePopupAction>({ type: CLOSE_USER_POPUP });
    yield put<TFetchUserAction>({
      type: FETCH_USER_ASYNC,
      payload: { token },
    });
    yield put<TFetchAdminListAction>({ type: FETCH_ADMIN_LIST_ASYNC });
    yield call(showAlert, {
      content: "Account data has been updated",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* editAccountWatcher(): Saga<void> {
  while (true) {
    const action: TEditAccountAction = yield take(EDIT_ACCOUNT_ASYNC);
    yield call(editAccountAsync, action);
  }
}


function* changePasswordAsync(action: TChangePasswordAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.ADMIN}/password`, action.payload, makeHeader()),
    );

    yield put<TClosePopupAction>({ type: CLOSE_USER_POPUP });
    yield call(showAlert, {
      content: "Password has been changed",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* changePasswordWatcher(): Saga<void> {
  while (true) {
    const action: TChangePasswordAction = yield take(CHANGE_PASSWORD_ASYNC);
    yield call(changePasswordAsync, action);
  }
}


export function* rootUserSaga(): Saga<void> {
  yield all([
    call(fetchUserWatcher),
    call(loginUserWatcher),
    call(sendCodeWatcher),
    call(verifyCodeWatcher),
    call(resetPasswordWatcher),
    call(updatePasswordWatcher),
    call(editAccountWatcher),
    call(changePasswordWatcher),
  ]);
}
