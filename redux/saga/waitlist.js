import {
  takeEvery, call, put, all,
} from "redux-saga/effects";
import axios from "axios";
import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";

import {
  FETCH_WAITLIST,
  FETCH_WAITLIST_SUCCEEDED,
  FETCH_WAITLIST_FAILED,
} from "../constants/waitlist";

function* fetchWaitlistAsync({ payload }) {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/event/users?id=${payload.id}`, makeHeader()),
    );
    yield put({
      type: FETCH_WAITLIST_SUCCEEDED,
      payload: { waitlist: response.data.waitlist },
    });
  } catch (error) {
    yield put({ type: FETCH_WAITLIST_FAILED, error });
  }
}

function* fetchWaitlistWatcher() {
  yield takeEvery(FETCH_WAITLIST, fetchWaitlistAsync);
}

export function* rootWaitlistSaga() {
  yield all([
    fetchWaitlistWatcher(),
  ]);
}
