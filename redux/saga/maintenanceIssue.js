// @flow

import { type Saga } from "redux-saga";
import {
  take, takeEvery, call, put, all,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
// import {
// type TAttachemetFromServer
// } from "../../pages/MaintenanceConfiguration/components/MaintenanceIssueCreate/types";
import { makeHeader } from "../helpers/makeHeader";
import {
  FETCH_MAINTENANCE_ISSUES_LIST_ASYNC,
  FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS,
  FETCH_MAINTENANCE_ISSUES_LIST_ERROR,
  GET_ISSUE_ATTACHMENTS_ASYNC,
  GET_ISSUE_ATTACHMENTS_ERROR,
  GET_ISSUE_ATTACHMENTS_SUCCESS,
  CREATE_ISSUE_ASYNC,
  UPDATE_ISSUE_ASYNC,
  DELETE_ISSUE_ASYNC,
  FETCH_MAINTENANCE_SLA_LIST_ASYNC,
  FETCH_MAINTENANCE_SLA_LIST_SUCCESS,
  FETCH_MAINTENANCE_SLA_LIST_ERROR,
  CREATE_SLA_ASYNC,
  UPDATE_SLA_ASYNC,
  DELETE_SLA_ASYNC,
  CLOSE_ISSUE_POPUP,
  CLOSE_SLA_POPUP,
  type TCreateIssueAction,
  type TEditIssueAction,
  type TFetchIssuesSuccessAction,
  type TFetchIssuesErrorAction,
  type TFetchSLASuccessAction,
  type TFetchSLAErrorAction,
  type TCreateSLAAction,
  type TEditSLAAction,
  type TClosePopupAction,
  type TClosePopupSLAAction,
  type TGetIssueAttachmentsAction,
  type TGetIssueAttachmentsSuccessAction,
  type TGetIssueAttachmentsErrorAction,
} from "../constants/maintenanceIssue";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";

function* fetchIssuesListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/troubleshooting`, makeHeader()),
    );
    yield put<TFetchIssuesSuccessAction>({
      type: FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS,
      payload: { issues: response.data },
    });
  } catch (e) {
    yield put<TFetchIssuesErrorAction>({
      type: FETCH_MAINTENANCE_ISSUES_LIST_ERROR,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchIssueListWatcher(): Saga<void> {
  yield takeEvery(FETCH_MAINTENANCE_ISSUES_LIST_ASYNC, fetchIssuesListAsync);
}

function* createIssueAsync(action: TCreateIssueAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/maintenance/troubleshooting`, action.payload.issue, makeHeader()),
    );
    yield call(fetchIssuesListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_ISSUE_POPUP });
    yield call(showAlert, {
      content: "Issue has been created",
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

function* createIssueWatcher(): Saga<void> {
  while (true) {
    const action: TCreateIssueAction = yield take(CREATE_ISSUE_ASYNC);
    yield call(createIssueAsync, action);
  }
}

function* editIssueAsync(action: TEditIssueAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/maintenance/troubleshooting`, action.payload.issue, makeHeader()),
    );
    yield call(fetchIssuesListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_ISSUE_POPUP });
    yield call(showAlert, {
      content: "Issue has been edited",
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

function* editIssueWatcher(): Saga<void> {
  while (true) {
    const action: TEditIssueAction = yield take(UPDATE_ISSUE_ASYNC);
    yield call(editIssueAsync, action);
  }
}

function* deleteIssueAsync({ payload }): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/maintenance/troubleshooting?id=${payload.id}`, makeHeader()),
    );
    yield call(fetchIssuesListAsync);
    yield call(showAlert, {
      content: "Issue has been deleted",
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

function* deleteIssueWatcher(): Saga<void> {
  yield takeEvery(DELETE_ISSUE_ASYNC, deleteIssueAsync);
}

/* SLA */
function* fetchSLAListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/sla`, makeHeader()),
    );
    yield put<TFetchSLASuccessAction>({
      type: FETCH_MAINTENANCE_SLA_LIST_SUCCESS,
      payload: { slas: response.data },
    });
  } catch (e) {
    yield put<TFetchSLAErrorAction>({
      type: FETCH_MAINTENANCE_SLA_LIST_ERROR,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchSlaListWatcher(): Saga<void> {
  yield takeEvery(FETCH_MAINTENANCE_SLA_LIST_ASYNC, fetchSLAListAsync);
}

function* createSlaAsync(action: TCreateSLAAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/maintenance/sla`, action.payload.sla, makeHeader()),
    );
    yield call(fetchSLAListAsync);
    yield put<TClosePopupSLAAction>({ type: CLOSE_SLA_POPUP });
    yield call(showAlert, {
      content: "SLA has been created",
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

function* createSlaWatcher(): Saga<void> {
  while (true) {
    const action: TCreateSLAAction = yield take(CREATE_SLA_ASYNC);
    yield call(createSlaAsync, action);
  }
}

function* editSLAAsync(action: TEditSLAAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/maintenance/sla`, action.payload.sla, makeHeader()),
    );
    yield call(fetchSLAListAsync);
    yield put<TClosePopupSLAAction>({ type: CLOSE_SLA_POPUP });
    yield call(showAlert, {
      content: "SLA has been edited",
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

function* editSLAWatcher(): Saga<void> {
  while (true) {
    const action: TEditSLAAction = yield take(UPDATE_SLA_ASYNC);
    yield call(editSLAAsync, action);
  }
}

function* deleteSlaAsync({ payload }): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/maintenance/sla?id=${payload.id}`, makeHeader()),
    );
    yield call(fetchSLAListAsync);
    yield call(showAlert, {
      content: "SLA has been deleted",
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

function* deleteSlaWatcher(): Saga<void> {
  yield takeEvery(DELETE_SLA_ASYNC, deleteSlaAsync);
}


function* getIssueAttachmentsAsync(action: TGetIssueAttachmentsAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/maintenance/troubleshooting_by_id?id=${action.payload.id}`, makeHeader()),
    );

    // const attachments: Array<TAttachemetFromServer> = response.data;

    // if (attachments.length) {
    //   const files = yield all(
    //     attachments.map((attachment) => call(() => axios.get(attachment.image_url))),
    //   );
    //   console.log(files);
    // }

    yield put<TGetIssueAttachmentsSuccessAction>({
      type: GET_ISSUE_ATTACHMENTS_SUCCESS,
      payload: { attachments: response.data },
    });
  } catch (e) {
    yield put<TGetIssueAttachmentsErrorAction>({
      type: GET_ISSUE_ATTACHMENTS_ERROR,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* getIssueAttachmentsWatcher(): Saga<void> {
  yield takeEvery(GET_ISSUE_ATTACHMENTS_ASYNC, getIssueAttachmentsAsync);
}


export function* rootMaintenanceIssueSaga(): Saga<void> {
  yield all([
    call(fetchIssueListWatcher),
    call(createIssueWatcher),
    call(editIssueWatcher),
    call(deleteIssueWatcher),
    call(fetchSlaListWatcher),
    call(createSlaWatcher),
    call(editSLAWatcher),
    call(deleteSlaWatcher),
    call(getIssueAttachmentsWatcher),
  ]);
}
