// @flow

export const CLOSE_ALERT: "CLOSE_ALERT" = "CLOSE_ALERT";
export const SHOW_ALERT: "SHOW_ALERT" = "SHOW_ALERT";

export const SHOW_USER_ERROR: "SHOW_USER_ERROR" = "SHOW_USER_ERROR";

export const SHOW_USER_MESSAGE: "SHOW_USER_MESSAGE" = "SHOW_USER_MESSAGE";

export type TCloseAlertAction = {
    type: typeof CLOSE_ALERT,
}

export type TShowAlertAction = {
    type: typeof SHOW_ALERT,
    payload: {
        type: string,
        content: string,
    }
}

export type TShowUserErrorAction = {
    type: typeof SHOW_USER_ERROR,
    payload: {
        content: string,
    }
}

export type TShowUserMessageAction = {
  type: typeof SHOW_USER_MESSAGE,
  payload: {
    type: string,
    content: string,
    duration: number,
  }
}


export type TAlertActionTypes = TCloseAlertAction
  | TShowAlertAction
  | TShowUserErrorAction
  | TShowUserMessageAction;
