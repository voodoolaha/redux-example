// @flow

import { type TAdmin } from "../../interface/admin";

import {
  FETCH_ADMIN_LIST_ASYNC,
  FETCH_ADMIN_LIST_ERROR,
  FETCH_ADMIN_LIST_SUCCESS,
  OPEN_ADMIN_POPUP,
  CLOSE_ADMIN_POPUP,
  type TAdminActionTypes,
} from "../constants/admin";


export type TAdminStore = {
  admins: Array<TAdmin>;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  popupItem: ?TAdmin;
}

const initialState: TAdminStore = {
  loading: true,
  fetchError: false,
  admins: [],
  popupOpened: false,
  popupItem: null,
};

export const adminReducer = (
  state: TAdminStore = initialState,
  action: TAdminActionTypes,
): TAdminStore => {
  switch (action.type) {
    case OPEN_ADMIN_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.admin,
      };
    case CLOSE_ADMIN_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_ADMIN_LIST_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        admins: action.payload.admins,
      };
    case FETCH_ADMIN_LIST_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return state;
  }
};
