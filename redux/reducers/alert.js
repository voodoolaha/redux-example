// @flow

import { CLOSE_ALERT, SHOW_ALERT } from "../constants/alert";


export const alertTypes = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
};

// eslint-disable-next-line no-undef
export type TAlertType = $Keys<typeof alertTypes>;

export type TAlertStore = {
  displayed: boolean;
  message: string;
  type: TAlertType;
}

const initialState = {
  displayed: false,
  message: "",
  type: "ERROR",
};

type TAlertPayload = {
  type: TAlertType;
  content: string;
}

const alertReducer = (
  state: TAlertStore = initialState,
  action: {type: string, payload: TAlertPayload},
) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        displayed: true,
        message: action.payload.content,
        type: action.payload.type,
      };
    case CLOSE_ALERT:
      return { ...initialState };
    default:
      return { ...state };
  }
};


export { alertReducer };
