// @flow

import { type TNotificationBody } from "../../pages/Notifications/components/NotificationPopup/types";
import {
  FETCH_NOTIFICATION_LIST_ASYNC,
  CREATE_NOTIFICATION_ASYNC,
  DELETE_NOTIFICATION_ASYNC,
  OPEN_NOTIFICATION_POPUP,
  CLOSE_NOTIFICATION_POPUP,
  type TFetchNotificationListAction,
  type TCreateNotificationAction,
  type TDeleteNotificationAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/notification";


export const fetchNotificationsAsync = (): TFetchNotificationListAction => ({
  type: FETCH_NOTIFICATION_LIST_ASYNC,
});

export const createNotificationAsync = (
  notification: TNotificationBody,
): TCreateNotificationAction => ({
  type: CREATE_NOTIFICATION_ASYNC,
  payload: { notification },
});

export const deleteNotificationAsync = (id: number): TDeleteNotificationAction => ({
  type: DELETE_NOTIFICATION_ASYNC,
  payload: { id },
});

export const openPopup = (): TOpenPopupAction => ({
  type: OPEN_NOTIFICATION_POPUP,
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_NOTIFICATION_POPUP,
});
