import { put, delay } from "redux-saga/effects";

import { SHOW_ALERT, CLOSE_ALERT } from "../constants/alert";
import { type TShowAlertProps } from "./types";


export function* showAlert({ content, type, duration }: TShowAlertProps): void {
  yield put({
    type: SHOW_ALERT,
    payload: { content, type },
  });
  yield delay(duration || 4000);
  yield put({ type: CLOSE_ALERT });
}
