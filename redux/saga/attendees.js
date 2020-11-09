import {
  takeEvery, call, put, all,
} from "redux-saga/effects";
import axios from "axios";
import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";

import {
  FETCH_ATTENDEES,
  FETCH_ATTENDEES_SUCCEEDED,
  FETCH_ATTENDEES_FAILED,
} from "../constants/attendees";

function* fetchAttendeesAsync({ payload }) {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/event/users?id=${payload.id}`, makeHeader()),
    );
    yield put({
      type: FETCH_ATTENDEES_SUCCEEDED,
      payload: { attendees: response.data.attendees },
    });
  } catch (error) {
    yield put({ type: FETCH_ATTENDEES_FAILED, error });
  }
}

function* fetchAttendeesWatcher() {
  yield takeEvery(FETCH_ATTENDEES, fetchAttendeesAsync);
}

export function* rootAttendeesSaga() {
  yield all([
    fetchAttendeesWatcher(),
  ]);
}
