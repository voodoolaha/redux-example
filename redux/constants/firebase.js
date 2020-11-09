// @flow

export const FIREBASE_AUTH_ASYNC: "FIREBASE_AUTH_ASYNC" = "FIREBASE_AUTH_ASYNC";
export const FIREBASE_AUTH_SUCCESS: "FIREBASE_AUTH_SUCCESS" = "FIREBASE_AUTH_SUCCESS";
export const FIREBASE_AUTH_ERROR: "FIREBASE_AUTH_ERROR" = "FIREBASE_AUTH_ERROR";

export const FIREBASE_LOGOUT: "FIREBASE_LOGOUT" = "FIREBASE_LOGOUT";

export const UPDATE_FIREBASE_TOKEN_ASYNC: "UPDATE_FIREBASE_TOKEN_ASYNC" = "UPDATE_FIREBASE_TOKEN_ASYNC";
export const UPDATE_FIREBASE_TOKEN_SUCCESS: "UPDATE_FIREBASE_TOKEN_SUCCESS" = "UPDATE_FIREBASE_TOKEN_SUCCESS";
export const UPDATE_FIREBASE_TOKEN_ERROR: "UPDATE_FIREBASE_TOKEN_ERROR" = "UPDATE_FIREBASE_TOKEN_ERROR";

export type TFirebaseAuthAction = {
  type: typeof FIREBASE_AUTH_ASYNC,
  payload: {
    firebase_token: string,
  }
}

export type TFirebaseAuthActionSuccess = {
  type: typeof FIREBASE_AUTH_SUCCESS,
}

export type TFirebaseAuthActionError = {
  type: typeof FIREBASE_AUTH_ERROR,
}

export type TFirebaseLogoutAction = {
  type: typeof FIREBASE_LOGOUT,
}

export type TUpdateFirebaseTokenAction = {
  type: typeof UPDATE_FIREBASE_TOKEN_ASYNC,
}

export type TUpdateFirebaseTokenSuccessAction = {
  type: typeof UPDATE_FIREBASE_TOKEN_SUCCESS,
}

export type TUpdateFirebaseTokenErrorAction = {
  type: typeof UPDATE_FIREBASE_TOKEN_ERROR,
}

export type TFirebaseActionTypes = TFirebaseAuthAction
  | TFirebaseAuthActionSuccess
  | TFirebaseAuthActionError
  | TFirebaseLogoutAction
  | TUpdateFirebaseTokenAction
  | TUpdateFirebaseTokenSuccessAction
  | TUpdateFirebaseTokenErrorAction
