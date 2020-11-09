// @flow

import { type TNotification } from "../../interface/notification";
import {
  FETCH_NOTIFICATION_LIST_ASYNC,
  FETCH_NOTIFICATION_LIST_SUCCESS,
  FETCH_NOTIFICATION_LIST_ERROR,
  OPEN_NOTIFICATION_POPUP,
  CLOSE_NOTIFICATION_POPUP,
  type TNotificationActionTypes,
} from "../constants/notification";

export type TNotificationStore = {
  notifications: Array<TNotification>;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
}

const initialState: TNotificationStore = {
  notifications: [],
  loading: true,
  fetchError: false,
  popupOpened: false,
};


export const notificationReducer = (
  state: TNotificationStore = initialState,
  action: TNotificationActionTypes,
): TNotificationStore => {
  switch (action.type) {
    case OPEN_NOTIFICATION_POPUP:
      return {
        ...state,
        popupOpened: true,
      };
    case CLOSE_NOTIFICATION_POPUP:
      return {
        ...state,
        popupOpened: false,
      };
    case FETCH_NOTIFICATION_LIST_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.notifications,
      };
    case FETCH_NOTIFICATION_LIST_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return state;
  }
};
