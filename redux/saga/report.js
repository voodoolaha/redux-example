// @flow

import { type Saga } from "redux-saga";
import axios from "axios";
import {
  takeEvery, call, all, put, take,
} from "redux-saga/effects";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";

import {
  FETCH_REPORT_ASYNC,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_ERROR,
  CREATE_REPORT_ASYNC,
  CLOSE_REPORT_POPUP,
  type TCreaterReportAction,
  type TFetchrReportsSuccessAction,
  type TFetchReportsErrorAction,
  type TClosePopupAction,
} from "../constants/report";

import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";

const mocks = [
  {
    id: 123,
    title: "SLA Report - USA",
    items: [],
  },
  {
    id: 124,
    title: "SLA Report - Germany",
    items: [],
  },
];

function* fetchReportAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/admin/reports`, makeHeader()),
    );

    yield put<TFetchrReportsSuccessAction>({
      type: FETCH_REPORT_SUCCESS,
      payload: { reports: response.data },
    });
  } catch (e) {
    yield put<TFetchReportsErrorAction>({
      type: FETCH_REPORT_ERROR,
    });
    yield put({
      type: FETCH_REPORT_SUCCESS,
      payload: { reports: mocks },
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchReportWatcher(): Saga<void> {
  yield takeEvery(FETCH_REPORT_ASYNC, fetchReportAsync);
}

function* createReportAsync(action: TCreaterReportAction): Saga<void> {
  try {
    yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/admin/reports?from=${action.payload.report.from}&to=${action.payload.report.to}`, makeHeader()),
    );
    // yield call(fetchReportAsync);
    yield put<TClosePopupAction>({ type: CLOSE_REPORT_POPUP });
    yield call(showAlert, {
      content: "Report has been created",
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

function* createReportWatcher(): Saga<void> {
  while (true) {
    const action: TCreaterReportAction = yield take(CREATE_REPORT_ASYNC);
    yield call(createReportAsync, action);
  }
}

export function* rootReportSaga(): Saga<void> {
  yield all([
    call(fetchReportWatcher),
    call(createReportWatcher),
  ]);
}
