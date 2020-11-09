// @flow

import { type Saga } from "redux-saga";
import {
  takeEvery, call, all, put,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import { showAlert } from "../helpers/showAlert";
import { alertTypes } from "../reducers/alert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_ADMIN_DETAILS_ASYNC,
  FETCH_ADMIN_DETAILS_SUCCESS,
  FETCH_ADMIN_DETAILS_ERROR,
  type TFetchAdminDetailsAction,
  type TFetchAdminDetailsSuccessAction,
  type TFetchAdminDetailsErrorAction,
} from "../constants/adminDetails";


function* fetchAdminDetailsSaga(action: TFetchAdminDetailsAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}${api.ADMIN}/given?aid=${action.payload.id}`, makeHeader()),
    );

    yield put<TFetchAdminDetailsSuccessAction>({
      type: FETCH_ADMIN_DETAILS_SUCCESS,
      payload: { admin: response.data },
    });
  } catch (e) {
    yield put<TFetchAdminDetailsErrorAction>({ type: FETCH_ADMIN_DETAILS_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
    });
  }
}

function* getAdminDetailsWatcher(): Saga<void> {
  yield takeEvery(FETCH_ADMIN_DETAILS_ASYNC, fetchAdminDetailsSaga);
}


export function* rootAdminDetailsSaga(): Saga<void> {
  yield all([
    call(getAdminDetailsWatcher),
  ]);
}
