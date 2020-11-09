// @flow

import { type Saga } from "redux-saga";
import {
  all, takeEvery, put, call, take,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { alertTypes } from "../reducers/alert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_WELLBEING_LIST_ASYNC,
  FETCH_WELLBEING_LIST_SUCCESS,
  FETCH_WELLBEING_LIST_ERROR,
  CLOSE_WELLBEING_POPUP,
  SEND_QUICK_REPLY_ASYNC,
  SEND_MESSAGE_ASYNC,
  type TFetchWellbeingListSuccessAction,
  type TFetchWellbeingListErrorAction,
  type TSendMessageAction,
  type TSendQuickReplyAction,
  type TClosePopupAction,
} from "../constants/wellbeingDashboard";


function* fetchWellbeingAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/wellbeing`, makeHeader()),
    );

    yield put<TFetchWellbeingListSuccessAction>({
      type: FETCH_WELLBEING_LIST_SUCCESS,
      payload: { wellbeingList: response.data },
    });
  } catch (e) {
    yield put<TFetchWellbeingListErrorAction>({ type: FETCH_WELLBEING_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchWellbeingListWatcher(): Saga<void> {
  yield takeEvery(FETCH_WELLBEING_LIST_ASYNC, fetchWellbeingAsync);
}

function* sendMessageAsync(action: TSendMessageAction): Saga<void> {
  const { message, requestId: wellbeing_request_id } = action.payload;

  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/wellbeing/reply`, { message, wellbeing_request_id }, makeHeader()),
    );

    yield call(fetchWellbeingAsync);
    yield put<TClosePopupAction>({ type: CLOSE_WELLBEING_POPUP });
    yield call(showAlert, {
      content: "Message has been sent",
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


function* sendMessageWatcher(): Saga<void> {
  while (true) {
    const action: TSendMessageAction = yield take(SEND_MESSAGE_ASYNC);
    yield call(sendMessageAsync, action);
  }
}


function* sendQuickReplyAsync(action: TSendQuickReplyAction): Saga<void> {
  const { status, requestId } = action.payload;
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/wellbeing/status`, { id: requestId, status }, makeHeader()),
    );

    yield call(fetchWellbeingAsync);
    yield put<TClosePopupAction>({ type: CLOSE_WELLBEING_POPUP });
    yield call(showAlert, {
      content: "Reply has been sent",
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


function* sendQuickReplyWatcher(): Saga<void> {
  while (true) {
    const action: TSendQuickReplyAction = yield take(SEND_QUICK_REPLY_ASYNC);
    yield call(sendQuickReplyAsync, action);
  }
}


export function* rootWellbeingDashboardSaga(): Saga<void> {
  yield all([
    call(fetchWellbeingListWatcher),
    call(sendMessageWatcher),
    call(sendQuickReplyWatcher),
  ]);
}
