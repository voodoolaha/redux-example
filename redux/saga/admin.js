// @flow

import { type Saga } from "redux-saga";
import {
  takeEvery, take, call, put, all, select, delay,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_ADMIN_LIST_ASYNC,
  FETCH_ADMIN_LIST_ERROR,
  FETCH_ADMIN_LIST_SUCCESS,
  CREATE_ADMIN_ASYNC,
  DELETE_ADMIN_ASYNC,
  EDIT_ADMIN_ASYNC,
  CLOSE_ADMIN_POPUP,
  type TFetchAdminListAction,
  type TFetchAdminListSuccessAction,
  type TFetchAdminListErrorAction,
  type TClosePopup,
  type TCreateAdminAction,
  type TEditAdminAction,
  type TDeleteAdminAction,
} from "../constants/admin";
import { FETCH_ADMIN_DETAILS_ASYNC, type TFetchAdminDetailsAction } from "../constants/adminDetails";
import { type TApplicationState } from "../types";
import { LOGOUT_USER, type TLogoutAction } from "../constants/user";


function* fetchAdminListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}${api.ADMIN}/all`, makeHeader()),
    );

    yield put<TFetchAdminListSuccessAction>({
      type: FETCH_ADMIN_LIST_SUCCESS,
      payload: { admins: response.data },
    });
  } catch (e) {
    yield put<TFetchAdminListErrorAction>({ type: FETCH_ADMIN_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchAdminListWatcher(): Saga<void> {
  yield takeEvery(FETCH_ADMIN_LIST_ASYNC, fetchAdminListAsync);
}


function* onActionSuccess(message: string): Saga<void> {
  yield call(fetchAdminListAsync);
  yield put<TClosePopup>({ type: CLOSE_ADMIN_POPUP });
  yield call(showAlert, {
    content: message,
    type: alertTypes.SUCCESS,
    duration: 3000,
  });
}

function* createAdminAsync(action: TCreateAdminAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}${api.ADMIN}`, action.payload.admin, makeHeader()),
    );

    yield call(onActionSuccess, "Admin has been created");
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* createAdminWatcher(): Saga<void> {
  while (true) {
    const action: TCreateAdminAction = yield take(CREATE_ADMIN_ASYNC);
    yield call(createAdminAsync, action);
  }
}


function* editAdminAsync(action: TEditAdminAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.ADMIN}`, action.payload.admin, makeHeader()),
    );

    yield put<TFetchAdminListAction>({ type: FETCH_ADMIN_LIST_ASYNC });
    yield put<TFetchAdminDetailsAction>({
      type: FETCH_ADMIN_DETAILS_ASYNC,
      payload: { id: action.payload.id.toString() },
    });
    yield call(onActionSuccess, "Admin has been edited");
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* editAdminWatcher(): Saga<void> {
  while (true) {
    const action = yield take(EDIT_ADMIN_ASYNC);
    yield call(editAdminAsync, action);
  }
}


function* deleteAdminAsync(action: TDeleteAdminAction): Saga<void> {
  const currentUserId = yield select(
    (state: TApplicationState) => state.user?.user?.id,
  );

  const userToDeleteId = action.payload.id;

  const currentUserDeleted = Number(userToDeleteId) === Number(currentUserId);

  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}${api.ADMIN}?aid=${userToDeleteId}`, makeHeader()),
    );

    if (currentUserDeleted) {
      yield call(showAlert, {
        content: "Your admin has been deleted. You can't login with these credentials anymore",
        type: alertTypes.SUCCESS,
        duration: 3000,
      });
      yield delay(500);
      localStorage.clear();
      yield put<TLogoutAction>({ type: LOGOUT_USER });
    } else {
      yield call(onActionSuccess, "Admin has been deleted");
    }
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* deleteAdminWatcher(): Saga<void> {
  yield takeEvery(DELETE_ADMIN_ASYNC, deleteAdminAsync);
}


export function* rootAdminSaga(): Saga<void> {
  yield all([
    call(fetchAdminListWatcher),
    call(createAdminWatcher),
    call(editAdminWatcher),
    call(deleteAdminWatcher),
  ]);
}
