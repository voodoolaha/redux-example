// @flow

import { type TAdmin } from "../../interface/admin";

export const FETCH_ADMIN_DETAILS_ASYNC: "FETCH_ADMIN_DETAILS_ASYNC" = "FETCH_ADMIN_DETAILS_ASYNC";
export const FETCH_ADMIN_DETAILS_SUCCESS: "FETCH_ADMIN_DETAILS_SUCCESS" = "FETCH_ADMIN_DETAILS_SUCCESS";
export const FETCH_ADMIN_DETAILS_ERROR: "FETCH_ADMIN_DETAILS_ERROR" = "FETCH_ADMIN_DETAILS_ERROR";

export type TFetchAdminDetailsAction = {
  type: typeof FETCH_ADMIN_DETAILS_ASYNC,
  payload: {
    id: string,
  }
}

export type TFetchAdminDetailsSuccessAction = {
  type: typeof FETCH_ADMIN_DETAILS_SUCCESS,
  payload: {
    admin: TAdmin,
  }
}

export type TFetchAdminDetailsErrorAction = {
  type: typeof FETCH_ADMIN_DETAILS_ERROR,
}


export type TAdminDetailsActionTypes = TFetchAdminDetailsAction
  | TFetchAdminDetailsSuccessAction
  | TFetchAdminDetailsErrorAction
