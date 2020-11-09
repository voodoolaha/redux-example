// @flow

import { type TAdmin } from "../../interface/admin";

export const FETCH_ADMIN_LIST_ASYNC: "FETCH_ADMIN_LIST_ASYNC" = "FETCH_ADMIN_LIST_ASYNC";
export const FETCH_ADMIN_LIST_SUCCESS: "FETCH_ADMIN_LIST_SUCCESS" = "FETCH_ADMIN_LIST_SUCCESS";
export const FETCH_ADMIN_LIST_ERROR: "FETCH_ADMIN_LIST_ERROR" = "FETCH_ADMIN_LIST_ERROR";

export const CREATE_ADMIN_ASYNC: "CREATE_ADMIN_ASYNC" = "CREATE_ADMIN_ASYNC";

export const EDIT_ADMIN_ASYNC: "EDIT_ADMIN_ASYNC" = "EDIT_ADMIN_ASYNC";

export const DELETE_ADMIN_ASYNC: "DELETE_ADMIN_ASYNC" = "DELETE_ADMIN_ASYNC";

export const OPEN_ADMIN_POPUP: "OPEN_ADMIN_POPUP" = "OPEN_ADMIN_POPUP";
export const CLOSE_ADMIN_POPUP: "CLOSE_ADMIN_POPUP" = "CLOSE_ADMIN_POPUP";


// client initiated actions
export type TFetchAdminListAction = {
  type: typeof FETCH_ADMIN_LIST_ASYNC,
}

export type TCreateAdminAction = {
  type: typeof CREATE_ADMIN_ASYNC,
  payload: {
    admin: FormData,
  }
}

export type TEditAdminAction = {
  type: typeof EDIT_ADMIN_ASYNC,
  payload: {
    admin: FormData,
    id: number,
  }
}

export type TDeleteAdminAction = {
  type: typeof DELETE_ADMIN_ASYNC,
  payload: {
    id: number,
  }
}

export type TOpenPopup = {
  type: typeof OPEN_ADMIN_POPUP,
  payload: {
    admin: ?TAdmin,
  }
}

export type TClosePopup = {
  type: typeof CLOSE_ADMIN_POPUP,
}

// saga initiated actions
export type TFetchAdminListSuccessAction = {
  type: typeof FETCH_ADMIN_LIST_SUCCESS,
  payload: {
    admins: Array<TAdmin>,
  }
}

export type TFetchAdminListErrorAction = {
  type: typeof FETCH_ADMIN_LIST_ERROR,
}


export type TAdminActionTypes = TFetchAdminListAction
  | TCreateAdminAction
  | TEditAdminAction
  | TDeleteAdminAction
  | TOpenPopup
  | TClosePopup
  | TFetchAdminListSuccessAction
  | TFetchAdminListErrorAction
