// @flow

import { type TNotification } from "../../interface/notification";
import { type TNotificationBody } from "../../pages/Notifications/components/NotificationPopup/types";

export const FETCH_NOTIFICATION_LIST_ASYNC: "FETCH_NOTIFICATION_LIST_ASYNC" = "FETCH_NOTIFICATION_LIST_ASYNC";
export const FETCH_NOTIFICATION_LIST_SUCCESS: "FETCH_NOTIFICATION_LIST_SUCCESS" = "FETCH_NOTIFICATION_LIST_SUCCESS";
export const FETCH_NOTIFICATION_LIST_ERROR: "FETCH_NOTIFICATION_LIST_ERROR" = "FETCH_NOTIFICATION_LIST_ERROR";

export const CREATE_NOTIFICATION_ASYNC: "CREATE_NOTIFICATION_ASYNC" = "CREATE_NOTIFICATION_ASYNC";

export const DELETE_NOTIFICATION_ASYNC: "DELETE_NOTIFICATION_ASYNC" = "DELETE_NOTIFICATION_ASYNC";

export const OPEN_NOTIFICATION_POPUP: "OPEN_NOTIFICATION_POPUP" = "OPEN_NOTIFICATION_POPUP";
export const CLOSE_NOTIFICATION_POPUP: "CLOSE_NOTIFICATION_POPUP" = "CLOSE_NOTIFICATION_POPUP";


// client initiated actions
export type TFetchNotificationListAction = {
  type: typeof FETCH_NOTIFICATION_LIST_ASYNC,
}

export type TCreateNotificationAction = {
  type: typeof CREATE_NOTIFICATION_ASYNC,
  payload: {
    notification: TNotificationBody,
  }
}

export type TDeleteNotificationAction = {
  type: typeof DELETE_NOTIFICATION_ASYNC,
  payload: {
    id: number,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_NOTIFICATION_POPUP,
}

export type TClosePopupAction = {
  type: typeof CLOSE_NOTIFICATION_POPUP,
}

// saga initiated actions
export type TFetchNotificationListSuccessAction = {
  type: typeof FETCH_NOTIFICATION_LIST_SUCCESS,
  payload: {
    notifications: Array<TNotification>;
  }
}

export type TFetchNotificationListErrorAction = {
  type: typeof FETCH_NOTIFICATION_LIST_ERROR,
}

export type TNotificationActionTypes = TFetchNotificationListAction
  | TCreateNotificationAction
  | TDeleteNotificationAction
  | TOpenPopupAction
  | TClosePopupAction
  | TFetchNotificationListSuccessAction
  | TFetchNotificationListErrorAction
