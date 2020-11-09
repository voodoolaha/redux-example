// @flow

import { type Saga } from "redux-saga";
import {
  all, takeEvery, put, call, take,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import { alertTypes } from "../reducers/alert";
import {
  FETCH_RESIDENT_LIST_ASYNC,
  FETCH_RESIDENT_LIST_SUCCESS,
  FETCH_RESIDENT_LIST_ERROR,
  FETCH_RESIDENT_ASYNC,
  FETCH_RESIDENT_SUCCESS,
  FETCH_RESIDENT_ERROR,
  UPLOAD_RESIDENT_LIST,
  RESIDENT_LIST_UPLOAD_FINISHED,
  type TFetchResidentListAction,
  type TFetchResidentListSuccessAction,
  type TFetchResidentListErrorAction,
  type TFetchResidentAction,
  type TFetchResidentSuccessAction,
  type TFetchResidentErrorAction,
  type TUploadResidentListAction,
  type TUploadFinishedAction,
} from "../constants/resident";

function* fetchResidentListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/user/admin/all_users`, makeHeader()),
    );

    yield put<TFetchResidentListSuccessAction>({
      type: FETCH_RESIDENT_LIST_SUCCESS,
      payload: {
        residents: response.data,
      },
    });
  } catch (e) {
    yield put<TFetchResidentListErrorAction>({ type: FETCH_RESIDENT_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchResidentListWatcher(): Saga<void> {
  yield takeEvery(FETCH_RESIDENT_LIST_ASYNC, fetchResidentListAsync);
}


function* fetchResidentAsync(action: TFetchResidentAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/user/admin/resident?id=${action.payload.id}`, makeHeader()),
    );

    yield put<TFetchResidentSuccessAction>({
      type: FETCH_RESIDENT_SUCCESS,
      payload: {
        resident: response.data,
      },
    });
  } catch (e) {
    yield put<TFetchResidentErrorAction>({ type: FETCH_RESIDENT_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* fetchResidentWatcher(): Saga<void> {
  yield takeEvery(FETCH_RESIDENT_ASYNC, fetchResidentAsync);
}


function* uploadResidentListAsync(action: TUploadResidentListAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/user/upload`, action.payload.residents, makeHeader()),
    );

    yield put<TUploadFinishedAction>({ type: RESIDENT_LIST_UPLOAD_FINISHED });
    yield put<TFetchResidentListAction>({ type: FETCH_RESIDENT_LIST_ASYNC });
    yield call(showAlert, {
      content: "Residents data have been uploaded",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield put<TUploadFinishedAction>({ type: RESIDENT_LIST_UPLOAD_FINISHED });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* uploadResidentListWatcher(): Saga<void> {
  while (true) {
    const action: TUploadResidentListAction = yield take(UPLOAD_RESIDENT_LIST);
    yield call(uploadResidentListAsync, action);
  }
}


export function* rootResidentSaga(): Saga<void> {
  yield all([
    call(fetchResidentListWatcher),
    call(fetchResidentWatcher),
    call(uploadResidentListWatcher),
  ]);
}
