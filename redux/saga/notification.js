// @flow

import axios from "axios";
import { type Saga } from "redux-saga";
import {
  all, put, call, takeEvery, take,
} from "redux-saga/effects";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { alertTypes } from "../reducers/alert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_NOTIFICATION_LIST_ASYNC,
  FETCH_NOTIFICATION_LIST_SUCCESS,
  FETCH_NOTIFICATION_LIST_ERROR,
  CREATE_NOTIFICATION_ASYNC,
  DELETE_NOTIFICATION_ASYNC,
  CLOSE_NOTIFICATION_POPUP,
  type TFetchNotificationListSuccessAction,
  type TFetchNotificationListErrorAction,
  type TCreateNotificationAction,
  type TDeleteNotificationAction,
  type TClosePopupAction,
} from "../constants/notification";


function* fetchNotificationListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/notification/admin_list`, makeHeader()),
    );

    yield put<TFetchNotificationListSuccessAction>({
      type: FETCH_NOTIFICATION_LIST_SUCCESS,
      payload: { notifications: response.data },
    });
  } catch (e) {
    yield put<TFetchNotificationListErrorAction>({ type: FETCH_NOTIFICATION_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchNotificationListWatcher(): Saga<void> {
  yield takeEvery(FETCH_NOTIFICATION_LIST_ASYNC, fetchNotificationListAsync);
}


function* onActionSuccess(message: string): Saga<void> {
  yield call(fetchNotificationListAsync);
  yield put<TClosePopupAction>({ type: CLOSE_NOTIFICATION_POPUP });
  yield call(showAlert, {
    content: message,
    type: alertTypes.SUCCESS,
    duration: 2000,
  });
}


function* createNotificationAsync(action: TCreateNotificationAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/notification`, { ...action.payload.notification }, makeHeader()),
    );

    yield call(onActionSuccess, "Notification has been created");
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* createNotificationWatcher(): Saga<void> {
  while (true) {
    const action: TCreateNotificationAction = yield take(CREATE_NOTIFICATION_ASYNC);
    yield call(createNotificationAsync, action);
  }
}


function* deleteNotificationAsync(action: TDeleteNotificationAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/notification?id=${action.payload.id}`, makeHeader()),
    );

    yield call(onActionSuccess, "Notification has been deleted");
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* deleteNotificationWatcher(): Saga<void> {
  yield takeEvery(DELETE_NOTIFICATION_ASYNC, deleteNotificationAsync);
}


export function* rootNotificationSaga(): Saga<void> {
  yield all([
    call(fetchNotificationListWatcher),
    call(createNotificationWatcher),
    call(deleteNotificationWatcher),
  ]);
}
