// @flow

import { type Saga } from "redux-saga";
import {
  take, takeEvery, call, put, all,
} from "redux-saga/effects";
import axios from "axios";
import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { fetchPastEventsAsync } from "./pastevents";

import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCEEDED,
  FETCH_EVENTS_FAILED,
  CREATE_EVENT,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCEEDED,
  DELETE_EVENT,
  GET_EVENT_DETAILS,
  GET_EVENT_DETAILS_SUCCEEDED,
  GET_EVENT_DETAILS_FAILED,
  CLOSE_EVENT_POPUP,
  type TCreateEventAction,
  type TEditEventAction,
  type TDeleteEventAction,
  type TFetchEventsSuccessAction,
  type TFetchEventsErrorAction,
  type TFetchEventAction,
  type TFetchEventSuccessAction,
  type TFetchEventErrorAction,
  type TClosePopupAction,
} from "../constants/events";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";

function* fetchEventsAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/event/all_for_admin`, makeHeader()),
    );
    yield put<TFetchEventsSuccessAction>({
      type: FETCH_EVENTS_SUCCEEDED,
      payload: { events: response.data.events },
    });
  } catch (e) {
    yield put<TFetchEventsErrorAction>({
      type: FETCH_EVENTS_FAILED,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchEventsWatcher(): Saga<void> {
  yield takeEvery(FETCH_EVENTS, fetchEventsAsync);
}

function* createEventAsync(action: TCreateEventAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/event`, action.payload.event, makeHeader()),
    );
    yield call(fetchEventsAsync);
    yield put<TClosePopupAction>({ type: CLOSE_EVENT_POPUP });
    yield call(showAlert, {
      content: "Event has been created",
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

function* createEventWatcher(): Saga<void> {
  while (true) {
    const action: TCreateEventAction = yield take(CREATE_EVENT);
    yield call(createEventAsync, action);
  }
}

function* editEventAsync(action: TEditEventAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/event`, action.payload.event, makeHeader()),
    );
    yield call(fetchEventsAsync);
    yield call(fetchPastEventsAsync);
    yield put<TClosePopupAction>({ type: CLOSE_EVENT_POPUP });
    yield call(showAlert, {
      content: "Event has been edited",
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

function* editEventWatcher(): Saga<void> {
  while (true) {
    const action: TEditEventAction = yield take(UPDATE_EVENT);
    yield call(editEventAsync, action);
  }
}

function* deleteEventAsync(action: TDeleteEventAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/event?eid=${action.payload.id}`, makeHeader()),
    );
    yield call(fetchEventsAsync);
    yield call(fetchPastEventsAsync);
    yield call(showAlert, {
      content: "Event has been canceled",
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

function* deleteEventWatcher(): Saga<void> {
  yield takeEvery(DELETE_EVENT, deleteEventAsync);
}

function* fetchEventDetailsAsync(action: TFetchEventAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/event?eid=${action.payload.id}`, makeHeader()),
    );
    yield put<TFetchEventSuccessAction>({
      type: GET_EVENT_DETAILS_SUCCEEDED,
      payload: { event: response.data },
    });
  } catch (e) {
    yield put<TFetchEventErrorAction>({
      type: GET_EVENT_DETAILS_FAILED,
    });

    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* getEventDetailsWatcher(): Saga<void> {
  yield takeEvery([GET_EVENT_DETAILS, UPDATE_EVENT_SUCCEEDED], fetchEventDetailsAsync);
}

export function* rootEventSaga(): Saga<void> {
  yield all([
    call(fetchEventsWatcher),
    call(createEventWatcher),
    call(editEventWatcher),
    call(deleteEventWatcher),
    call(getEventDetailsWatcher),
  ]);
}
