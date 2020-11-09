// @flow

import { type TWellbeingDashboard } from "../../interface/wellbeingDashboard";

export const FETCH_WELLBEING_LIST_ASYNC: "FETCH_WELLBEING_LIST_ASYNC" = "FETCH_WELLBEING_LIST_ASYNC";
export const FETCH_WELLBEING_LIST_SUCCESS: "FETCH_WELLBEING_LIST_SUCCESS" = "FETCH_WELLBEING_LIST_SUCCESS";
export const FETCH_WELLBEING_LIST_ERROR: "FETCH_WELLBEING_LIST_ERROR" = "FETCH_WELLBEING_LIST_ERROR";

export const SEND_MESSAGE_ASYNC: "SEND_MESSAGE_ASYNC" = "SEND_MESSAGE_ASYNC";

export const SEND_QUICK_REPLY_ASYNC: "SEND_QUICK_REPLY_ASYNC" = "SEND_QUICK_REPLY_ASYNC";

export const OPEN_WELLBEING_POPUP: "OPEN_WELLBEING_POPUP" = "OPEN_WELLBEING_POPUP";
export const CLOSE_WELLBEING_POPUP: "CLOSE_WELLBEING_POPUP" = "CLOSE_WELLBEING_POPUP";

export type TFilteredNotificatonList = {
  [date_time_key: string]: TWellbeingDashboard
}

// client initiated actions
export type TFetchWellbeingListAction = {
  type: typeof FETCH_WELLBEING_LIST_ASYNC,
}

export type TSendMessageAction = {
  type: typeof SEND_MESSAGE_ASYNC,
  payload: {
    requestId: number,
    message: string,
  }
}

export type TSendQuickReplyAction = {
  type: typeof SEND_QUICK_REPLY_ASYNC,
  payload: {
    requestId: number,
    status: number,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_WELLBEING_POPUP,
  payload: {
    id: number;
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_WELLBEING_POPUP,
}

// saga initiated actions
export type TFetchWellbeingListSuccessAction = {
  type: typeof FETCH_WELLBEING_LIST_SUCCESS,
  payload: {
    wellbeingList: TFilteredNotificatonList,
  }
}

export type TFetchWellbeingListErrorAction = {
  type: typeof FETCH_WELLBEING_LIST_ERROR,
}


export type TWellbeingRequestActionTypes = TFetchWellbeingListAction
  | TSendMessageAction
  | TSendQuickReplyAction
  | TOpenPopupAction
  | TClosePopupAction
  | TFetchWellbeingListSuccessAction
  | TFetchWellbeingListErrorAction
