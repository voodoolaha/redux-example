// @flow

import { type TAdmin } from "../../interface/admin";

export const SUCCESS: "SUCCESS" = "SUCCESS";
export const ERROR: "ERROR" = "ERROR";

export type TRequestStatus = typeof SUCCESS | typeof ERROR;


export const CHANGE_PASSWORD_POPUP: "CHANGE_PASSWORD_POPUP" = "CHANGE_PASSWORD_POPUP";
export const ACCOUNT_POPUP: "ACCOUNT_POPUP" = "ACCOUNT_POPUP";

export type TPopupType = typeof CHANGE_PASSWORD_POPUP | typeof ACCOUNT_POPUP;


export const FETCH_USER_ASYNC: "FETCH_USER_ASYNC" = "FETCH_USER_ASYNC";
export const FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS" = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR: "FETCH_USER_ERROR" = "FETCH_USER_ERROR";

export const LOGIN_ASYNC: "LOGIN_ASYNC" = "LOGIN_ASYNC";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";

export const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";

export const UPDATE_PASSWORD_ASYNC: "UPDATE_PASSWORD_ASYNC" = "UPDATE_PASSWORD_ASYNC";

export const SEND_CODE_ASYNC: "SEND_CODE_ASYNC" = "SEND_CODE_ASYNC";
export const SEND_CODE_RESPONSE: "SEND_CODE_RESPONSE" = "SEND_CODE_RESPONSE";

export const VERIFY_CODE_ASYNC: "VERIFY_CODE_ASYNC" = "VERIFY_CODE_ASYNC";
export const VERIFY_CODE_RESPONSE: "VERIFY_CODE_RESPONSE" = "VERIFY_CODE_RESPONSE";

export const RESET_PASSWORD_ASYNC: "RESET_PASSWORD_ASYNC" = "RESET_PASSWORD_ASYNC";
export const RESET_PASSWORD_RESPONSE: "RESET_PASSWORD_RESPONSE" = "RESET_PASSWORD_RESPONSE";

export const EDIT_ACCOUNT_ASYNC: "EDIT_ACCOUNT_ASYNC" = "EDIT_ACCOUNT_ASYNC";

export const CHANGE_PASSWORD_ASYNC: "CHANGE_PASSWORD_ASYNC" = "CHANGE_PASSWORD_ASYNC";

export const OPEN_USER_POPUP: "OPEN_USER_POPUP" = "OPEN_USER_POPUP";
export const CLOSE_USER_POPUP: "CLOSE_USER_POPUP" = "CLOSE_USER_POPUP";


// client initiated actions
export type TFetchUserAction = {
  type: typeof FETCH_USER_ASYNC,
}

export type TLoginAction = {
  type: typeof LOGIN_ASYNC,
  payload: {
    email: string,
    password: string,
  }
}

export type TLogicSuccessAction = {
  type: typeof LOGIN_SUCCESS,
  payload: {
    token: string,
    firebase_token: string,
  }
}

export type TLogoutAction = {
  type: typeof LOGOUT_USER,
}

export type TUpdatePasswordAction = {
  type: typeof UPDATE_PASSWORD_ASYNC,
  payload: {
    password: string,
    token: string,
  }
}

export type TSendCodeAction = {
  type: typeof SEND_CODE_ASYNC,
  payload: {
    email: string,
  }
}

export type TVerifyCodeAction = {
  type: typeof VERIFY_CODE_ASYNC,
  payload: {
    email: string,
    code: string,
  }
}

export type TResetPasswordAction = {
  type: typeof RESET_PASSWORD_ASYNC,
  payload: {
    email: string,
    password: string,
  }
}

export type TEditAccountAction = {
  type: typeof EDIT_ACCOUNT_ASYNC,
  payload: {
    formData: FormData,
  }
}

export type TChangePasswordAction = {
  type: typeof CHANGE_PASSWORD_ASYNC,
  payload: {
    old: string,
    new: string,
  }
}

// saga initiated actions
export type TFetchUserSuccessAction = {
  type: typeof FETCH_USER_SUCCESS,
  payload: {
    user: TAdmin,
    token: string,
    firebase_token: string,
  }
}

export type TFetchUserErrorAction = {
  type: typeof FETCH_USER_ERROR,
}

export type TSendCodeResponseAction = {
  type: typeof SEND_CODE_RESPONSE,
  payload: {
    response: TRequestStatus,
  }
}

export type TVerifyCodeResponseAction = {
  type: typeof VERIFY_CODE_RESPONSE,
  payload: {
    response: TRequestStatus,
  }
}

export type TResetPasswordResponseAction = {
  type: typeof RESET_PASSWORD_RESPONSE,
  payload: {
    response: TRequestStatus,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_USER_POPUP,
  payload: {
    type: TPopupType,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_USER_POPUP,
}


export type TUserActionTypes = TFetchUserAction
  | TFetchUserSuccessAction
  | TFetchUserErrorAction
  | TLoginAction
  | TLogicSuccessAction
  | TLogoutAction
  | TUpdatePasswordAction
  | TSendCodeAction
  | TVerifyCodeAction
  | TResetPasswordAction
  | TEditAccountAction
  | TChangePasswordAction
  | TSendCodeResponseAction
  | TVerifyCodeResponseAction
  | TResetPasswordResponseAction
  | TOpenPopupAction
  | TClosePopupAction
