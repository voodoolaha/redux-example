// @flow

import axios from "axios";
import { type Saga } from "redux-saga";
import {
  put, takeEvery, call, all, select,
} from "redux-saga/effects";

import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import { firebase } from "../../services/firebase";
import { makeHeader } from "../helpers/makeHeader";
import api from "../../config/api";

import { type TApplicationState } from "../types";

import {
  FIREBASE_AUTH_ASYNC,
  FIREBASE_AUTH_ERROR,
  FIREBASE_AUTH_SUCCESS,
  FIREBASE_LOGOUT,
  UPDATE_FIREBASE_TOKEN_ASYNC,
  UPDATE_FIREBASE_TOKEN_SUCCESS,
  UPDATE_FIREBASE_TOKEN_ERROR,
  type TFirebaseAuthAction,
  type TFirebaseAuthActionError,
  type TFirebaseAuthActionSuccess,
  type TUpdateFirebaseTokenAction,
  type TUpdateFirebaseTokenSuccessAction,
  type TUpdateFirebaseTokenErrorAction,
} from "../constants/firebase";

import { LOGOUT_USER, type TLogoutAction } from "../constants/user";


function* firebaseAuthAsync(action: TFirebaseAuthAction): Saga<void> {
  try {
    yield call(
      () => firebase.auth().signInWithCustomToken(action.payload.firebase_token),
    );

    yield put<TFirebaseAuthActionSuccess>({ type: FIREBASE_AUTH_SUCCESS });
  } catch (e) {
    yield put<TFirebaseAuthActionError>({ type: FIREBASE_AUTH_ERROR });

    const failedUpdatesCount = yield select(
      (state: TApplicationState) => state.firebaseRedux.updateFailureCount,
    );

    if (failedUpdatesCount < 5) {
      yield put<TUpdateFirebaseTokenAction>({ type: UPDATE_FIREBASE_TOKEN_ASYNC });
    } else {
      localStorage.removeItem("firebase_token");
      localStorage.removeItem("token");

      yield put<TLogoutAction>({ type: LOGOUT_USER });

      yield call(showAlert, {
        content: "Too many attempts to update your firebase token, please relogin",
        type: alertTypes.INFO,
        duration: 5000,
      });
    }
  }
}

function* firebaseAuthWatcher(): Saga<void> {
  yield takeEvery(FIREBASE_AUTH_ASYNC, firebaseAuthAsync);
}


function* firebaseLogoutAsync(): Saga<void> {
  try {
    yield call(() => firebase.logout());
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 5000,
    });
  }
}

function* firebaseLogoutWatcher(): Saga<void> {
  yield takeEvery(FIREBASE_LOGOUT, firebaseLogoutAsync);
}


function* updateFirebaseTokenAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/user/fb_token`, makeHeader()),
    );

    const firebase_token = response?.data || "";

    localStorage.setItem("firebase_token", firebase_token);

    yield put<TUpdateFirebaseTokenSuccessAction>({ type: UPDATE_FIREBASE_TOKEN_SUCCESS });
    yield put<TFirebaseAuthAction>({
      type: FIREBASE_AUTH_ASYNC,
      payload: { firebase_token },
    });
  } catch (e) {
    yield put<TUpdateFirebaseTokenErrorAction>({ type: UPDATE_FIREBASE_TOKEN_ERROR });

    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 5000,
    });
  }
}

function* updateFirebaseTokenWatcher(): Saga<void> {
  yield takeEvery(UPDATE_FIREBASE_TOKEN_ASYNC, updateFirebaseTokenAsync);
}

export function* rootFirebaseSaga(): Saga<void> {
  yield all([
    call(firebaseAuthWatcher),
    call(firebaseLogoutWatcher),
    call(updateFirebaseTokenWatcher),
  ]);
}
