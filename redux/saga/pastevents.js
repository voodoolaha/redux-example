// @flow

import { type Saga } from "redux-saga";
import {
  takeEvery, call, put, all,
} from "redux-saga/effects";
import axios from "axios";
import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";

import {
  FETCH_EVENTS_PAST,
  FETCH_EVENTS_PAST_SUCCEEDED,
  FETCH_EVENTS_PAST_FAILED,
  type TFetchPastEventsSuccessAction,
  type TFetchPastEventsErrorAction,
} from "../constants/pastevents";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";

export function* fetchPastEventsAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/event/past`, makeHeader()),
    );
    yield put<TFetchPastEventsSuccessAction>({
      type: FETCH_EVENTS_PAST_SUCCEEDED,
      payload: { pastevents: response.data.events },
    });
  } catch (e) {
    yield put<TFetchPastEventsErrorAction>({
      type: FETCH_EVENTS_PAST_FAILED,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchPastEventsWatcher(): Saga<void> {
  yield takeEvery(FETCH_EVENTS_PAST, fetchPastEventsAsync);
}

export function* rootPastEventSaga(): Saga<void> {
  yield all([
    call(fetchPastEventsWatcher),
  ]);
}
