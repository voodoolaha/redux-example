// @flow

import {
  FETCH_WELLBEING_LIST_ASYNC,
  SEND_MESSAGE_ASYNC,
  SEND_QUICK_REPLY_ASYNC,
  OPEN_WELLBEING_POPUP,
  CLOSE_WELLBEING_POPUP,
  type TFetchWellbeingListAction,
  type TSendMessageAction,
  type TSendQuickReplyAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/wellbeingDashboard";


export const fetchWellbeingListAsync = (): TFetchWellbeingListAction => ({
  type: FETCH_WELLBEING_LIST_ASYNC,
});

export const sendMessageAsync = (
  message: string, requestId: number,
): TSendMessageAction => ({
  type: SEND_MESSAGE_ASYNC,
  payload: { message, requestId },
});

export const sendQuickReplyAsync = (
  status: number, requestId: number,
): TSendQuickReplyAction => ({
  type: SEND_QUICK_REPLY_ASYNC,
  payload: { status, requestId },
});

export const openPopup = (id: number): TOpenPopupAction => ({
  type: OPEN_WELLBEING_POPUP,
  payload: { id },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_WELLBEING_POPUP,
});
