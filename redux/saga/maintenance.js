// @flow

import { type Saga } from "redux-saga";
import axios from "axios";
import {
  takeEvery, call, all, put, take,
} from "redux-saga/effects";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import {
  FETCH_MAINTENANCE_LIST_ASYNC,
  FETCH_MAINTENANCE_LIST_SUCCESS,
  FETCH_MAINTENANCE_LIST_ERROR,
  CREATE_MAINTENANCE_ASYNC,
  UPDATE_MAINTENANCE_ASYNC,
  VIEW_MAINTENANCE_ASYNC,
  VIEW_MAINTENANCE_SUCCESS,
  VIEW_MAINTENANCE_ERROR,
  CLOSE_MAINTENANCE_POPUP,
  type TCreateMaintenanceAction,
  type TEditMaintenanceAction,
  type TFetchMaintenancesSuccessAction,
  type TFetchMaintenancesErrorAction,
  type TFetchMaintenanceAction,
  type TFetchMaintenanceSuccessAction,
  type TFetchMaintenanceErrorAction,
  type TClosePopupAction,
} from "../constants/maintenance";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";

function* fetchMaintenanceListAsync(payload = ''): Saga<void> {

  const {id} = payload;

  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/list_for_admin?status=${id === "undefined" ? id : ''}`, makeHeader()),
    );
    yield put<TFetchMaintenancesSuccessAction>({
      type: FETCH_MAINTENANCE_LIST_SUCCESS,
      payload: { maintenances: response.data },
    });
  } catch (e) {
    yield put<TFetchMaintenancesErrorAction>({
      type: FETCH_MAINTENANCE_LIST_ERROR,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchMaintenanceListWatcher(): Saga<void> {
  yield takeEvery(FETCH_MAINTENANCE_LIST_ASYNC, fetchMaintenanceListAsync);
}

function* createMaintenanceAsync(action: TCreateMaintenanceAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/maintenance/admin`, action.payload.maintenance, makeHeader()),
    );
    yield call(fetchMaintenanceListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_MAINTENANCE_POPUP });
    yield call(showAlert, {
      content: "Maintenance has been created",
      type: alertTypes.SUCCESS,
      duration: 3000,
    });
  } catch (e) {
    console.log(e);
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* createMaintenanceWatcher(): Saga<void> {
  while (true) {
    const action: TCreateMaintenanceAction = yield take(CREATE_MAINTENANCE_ASYNC);
    yield call(createMaintenanceAsync, action);
  }
}

function* editMaintenanceAsync(action: TEditMaintenanceAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/maintenance/admin`, action.payload.maintenance, makeHeader()),
    );
    yield call(fetchMaintenanceListAsync);
    yield put<TFetchMaintenanceAction>({
      type: VIEW_MAINTENANCE_ASYNC,
      payload: { id: action.payload.id },
    });
    yield put<TClosePopupAction>({ type: CLOSE_MAINTENANCE_POPUP });
    yield call(showAlert, {
      content: "Maintenance has been edited",
      type: alertTypes.SUCCESS,
      duration: 3000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* editMaintenanceWatcher(): Saga<void> {
  while (true) {
    const action: TEditMaintenanceAction = yield take(UPDATE_MAINTENANCE_ASYNC);
    yield call(editMaintenanceAsync, action);
  }
}

function* viewMaintenanceAsync(action: TFetchMaintenanceAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance?id=${action.payload.id}`, makeHeader()),
    );
    yield put<TFetchMaintenanceSuccessAction>({
      type: VIEW_MAINTENANCE_SUCCESS,
      payload: { maintenance: response.data },
    });
  } catch (e) {
    yield put<TFetchMaintenanceErrorAction>({
      type: VIEW_MAINTENANCE_ERROR,
    });

    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* viewMaintenanceWatcher(): Saga<void> {
  yield takeEvery(VIEW_MAINTENANCE_ASYNC, viewMaintenanceAsync);
}

export function* rootMaintenanceSaga(): Saga<void> {
  yield all([
    call(fetchMaintenanceListWatcher),
    call(createMaintenanceWatcher),
    call(editMaintenanceWatcher),
    call(viewMaintenanceWatcher),
  ]);
}
