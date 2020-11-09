// @flow

import axios from "axios";
import { type Saga } from "redux-saga";
import {
  takeEvery, call, all, put, take,
} from "redux-saga/effects";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { alertTypes } from "../reducers/alert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_SITE_LIST_ASYNC,
  FETCH_SITE_LIST_SUCCESS,
  FETCH_SITE_LIST_ERROR,
  FETCH_SITES_STRUCTURE_ASYNC,
  FETCH_SITES_STRUCTURE_SUCCESS,
  FETCH_SITES_STRUCTURE_ERROR,
  FETCH_SITES_LOCATIONS_ASYNC,
  FETCH_SITES_LOCATIONS_SUCCESS,
  FETCH_SITES_LOCATIONS_ERROR,
  CREATE_SITE_ASYNC,
  EDIT_SITE_ASYNC,
  DELETE_SITE_ASYNC,
  CLOSE_SITE_POPUP,
  type TFetchSiteListSuccessAction,
  type TFetchSiteListErrorAction,
  type TFetchSiteStructureSuccessAction,
  type TFetchSiteStructureErrorAction,
  type TFetchSitesLocationsSuccessAction,
  type TFetchSitesLocationsErrorAction,
  type TCreateSiteAction,
  type TEditSiteAction,
  type TDeleteSiteAction,
  type TClosePopupAction,
} from "../constants/site";


function* fetchSiteListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/site`, makeHeader()),
    );

    yield put<TFetchSiteListSuccessAction>({
      type: FETCH_SITE_LIST_SUCCESS,
      payload: { sites: response.data },
    });
  } catch (e) {
    yield put<TFetchSiteListErrorAction>({ type: FETCH_SITE_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchSiteListWatcher(): Saga<void> {
  yield takeEvery(FETCH_SITE_LIST_ASYNC, fetchSiteListAsync);
}


function* fetchSiteStructureAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/site/list`, makeHeader()),
    );

    yield put<TFetchSiteStructureSuccessAction>({
      type: FETCH_SITES_STRUCTURE_SUCCESS,
      payload: { structure: response.data.result },
    });
  } catch (e) {
    yield put<TFetchSiteStructureErrorAction>({ type: FETCH_SITES_STRUCTURE_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchSiteStructureWatcher(): Saga<void> {
  yield takeEvery(FETCH_SITES_STRUCTURE_ASYNC, fetchSiteStructureAsync);
}


function* fetchSitesLocationsAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/site/cities`, makeHeader()),
    );

    yield put<TFetchSitesLocationsSuccessAction>({
      type: FETCH_SITES_LOCATIONS_SUCCESS,
      payload: { locations: response.data.result },
    });
  } catch (e) {
    yield put<TFetchSitesLocationsErrorAction>({ type: FETCH_SITES_LOCATIONS_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchSitesLocationsWatcher(): Saga<void> {
  yield takeEvery(FETCH_SITES_LOCATIONS_ASYNC, fetchSitesLocationsAsync);
}


function* createSiteAsync(action: TCreateSiteAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/site`, { ...action.payload.site }, makeHeader()),
    );

    yield call(fetchSiteListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_SITE_POPUP });
    yield call(showAlert, {
      content: "Site has been created",
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

function* createSiteWatcher(): Saga<void> {
  while (true) {
    const action: TCreateSiteAction = yield take(CREATE_SITE_ASYNC);
    yield call(createSiteAsync, action);
  }
}


function* editSiteAsync(action: TEditSiteAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/site`, { ...action.payload.site }, makeHeader()),
    );

    yield call(fetchSiteListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_SITE_POPUP });
    yield call(showAlert, {
      content: "Site has been edited",
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

function* editSiteWatcher(): Saga<void> {
  while (true) {
    const action: TEditSiteAction = yield take(EDIT_SITE_ASYNC);
    yield call(editSiteAsync, action);
  }
}


function* deleteSiteAsync(action: TDeleteSiteAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/site?id=${action.payload.id}`, makeHeader()),
    );

    yield call(fetchSiteListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_SITE_POPUP });
    yield call(showAlert, {
      content: "Site has been deleted",
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

function* deleteSiteWatcher(): Saga<void> {
  while (true) {
    const action: TDeleteSiteAction = yield take(DELETE_SITE_ASYNC);
    yield call(deleteSiteAsync, action);
  }
}


export function* rootSiteSaga(): Saga<void> {
  yield all([
    call(fetchSiteListWatcher),
    call(fetchSiteStructureWatcher),
    call(fetchSitesLocationsWatcher),
    call(createSiteWatcher),
    call(editSiteWatcher),
    call(deleteSiteWatcher),
  ]);
}
