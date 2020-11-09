// @flow

import { type Saga } from "redux-saga";
import { takeEvery, call, all } from "redux-saga/effects";

import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import {
  SHOW_USER_ERROR,
  SHOW_USER_MESSAGE,
  type TShowUserMessageAction,
  type TShowUserErrorAction,
} from "../constants/alert";


function* showUserErrorAsync(action: TShowUserErrorAction): Saga<void> {
  yield call(showAlert, {
    content: action.payload.content,
    type: alertTypes.ERROR,
    duration: 8000,
  });
}

function* showUserErrorWatcher(): Saga<void> {
  yield takeEvery(SHOW_USER_ERROR, showUserErrorAsync);
}


function* showUserMessageAsync(action: TShowUserMessageAction): Saga<void> {
  yield call(showAlert, {
    content: action.payload.content,
    type: alertTypes[action.payload.type],
    duration: action.payload.duration,
  });
}

function* showUserMessageWatcher(): Saga<void> {
  yield takeEvery(SHOW_USER_MESSAGE, showUserMessageAsync);
}


export function* rootAlertSaga(): Saga<void> {
  yield all([
    call(showUserErrorWatcher),
    call(showUserMessageWatcher),
  ]);
}
