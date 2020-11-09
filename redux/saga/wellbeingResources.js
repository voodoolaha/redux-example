// @flow

import axios from "axios";
import { type Saga } from "redux-saga";
import {
  all, put, takeEvery, call, take,
} from "redux-saga/effects";

import {
  FETCH_RESOURCE_LIST_ASYNC,
  FETCH_RESOURCE_LIST_SUCCESS,
  FETCH_RESOURCE_LIST_ERROR,
  CREATE_RESOURCE_ASYNC,
  EDIT_RESOURCE_ASYNC,
  DELETE_RESOURCE_ASYNC,
  CLOSE_RESOURCE_POPUP,
  type TFetchResourceListSuccessAction,
  type TFetchResourceListErrorAction,
  type TCreateResourceAction,
  type TDeleteResourceAction,
  type TEditResourceAction,
  type TClosePopupAction,
} from "../constants/wellbeingResources";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { alertTypes } from "../reducers/alert";
import { getErrorMessage } from "../helpers/errorMessage";


function* fetchResourceListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/wellbeing/resource`, makeHeader()),
    );

    yield put<TFetchResourceListSuccessAction>({
      type: FETCH_RESOURCE_LIST_SUCCESS,
      payload: {
        resources: response.data,
      },
    });
  } catch (e) {
    yield put<TFetchResourceListErrorAction>({ type: FETCH_RESOURCE_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchResourceListWatcher(): Saga<void> {
  yield takeEvery(FETCH_RESOURCE_LIST_ASYNC, fetchResourceListAsync);
}


function* createResourceAsync(action: TCreateResourceAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/wellbeing/resource`, action.payload.resource, makeHeader()),
    );

    yield call(fetchResourceListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_RESOURCE_POPUP });
    yield call(showAlert, {
      content: "Resource has been created",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* createResourceWatcher(): Saga<void> {
  while (true) {
    const action: TCreateResourceAction = yield take(CREATE_RESOURCE_ASYNC);
    yield call(createResourceAsync, action);
  }
}


function* editResourceAsync(action: TEditResourceAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/wellbeing/resource`, { ...action.payload.resource }, makeHeader()),
    );

    yield call(fetchResourceListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_RESOURCE_POPUP });
    yield call(showAlert, {
      content: "Resource has been edited",
      type: alertTypes.SUCCESS,
      duration: 2000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* deleteResourceAsync(action: TDeleteResourceAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/wellbeing/resource?id=${action.payload.id}`, makeHeader()),
    );

    yield call(fetchResourceListAsync);
    yield call(showAlert, {
      content: "Resource has been deleted",
      type: alertTypes.SUCCESS,
      duration: 1500,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* editResourceWatcher(): Saga<void> {
  while (true) {
    const action: TEditResourceAction = yield take(EDIT_RESOURCE_ASYNC);
    yield call(editResourceAsync, action);
  }
}

function* deleteResourceWatcher(): Saga<void> {
  while (true) {
    const action: TDeleteResourceAction = yield take(DELETE_RESOURCE_ASYNC);
    yield call(deleteResourceAsync, action);
  }
}

export function* rootWellbeingResourcesSaga(): Saga<void> {
  yield all([
    call(fetchResourceListWatcher),
    call(createResourceWatcher),
    call(editResourceWatcher),
    call(deleteResourceWatcher),
  ]);
}
