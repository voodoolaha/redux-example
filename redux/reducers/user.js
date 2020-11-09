// @flow

import { type TAdmin } from "../../interface/admin";
import {
  FETCH_USER_ASYNC,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  LOGOUT_USER,
  LOGIN_SUCCESS,
  SEND_CODE_RESPONSE,
  VERIFY_CODE_RESPONSE,
  RESET_PASSWORD_RESPONSE,
  OPEN_USER_POPUP,
  CLOSE_USER_POPUP,
  type TPopupType,
  type TRequestStatus,
  type TUserActionTypes,
} from "../constants/user";


export type TUserStore = {
  token: string;
  firebase_token: string;
  user: ?TAdmin;
  loading: boolean;
  error: boolean;
  sendCodeStatus: ?TRequestStatus,
  verifyCodeStatus: ?TRequestStatus,
  resetPasswordStatus: ?TRequestStatus,
  popupOpened: boolean,
  popupType: ?TPopupType,
}


const initialState: TUserStore = {
  token: "",
  firebase_token: "",
  user: null,
  loading: false,
  error: false,
  sendCodeStatus: null,
  verifyCodeStatus: null,
  resetPasswordStatus: null,
  popupOpened: false,
  popupType: null,
};


export const userReducer = (
  state: TUserStore = initialState,
  action: TUserActionTypes,
): TUserStore => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        firebase_token: action.payload.firebase_token,
      };
    case FETCH_USER_ASYNC:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        firebase_token: action.payload.firebase_token,
        loading: false,
      };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: true };
    case SEND_CODE_RESPONSE:
      return { ...state, sendCodeStatus: action.payload.response };
    case VERIFY_CODE_RESPONSE:
      return { ...state, verifyCodeStatus: action.payload.response };
    case RESET_PASSWORD_RESPONSE:
      return { ...state, resetPasswordStatus: action.payload.response };
    case LOGOUT_USER:
      return initialState;
    case OPEN_USER_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupType: action.payload.type,
      };
    case CLOSE_USER_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupType: null,
      };
    default:
      return state;
  }
};
