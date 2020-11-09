// @flow

import {
  FETCH_USER_ASYNC,
  LOGIN_ASYNC,
  LOGOUT_USER,
  SEND_CODE_ASYNC,
  VERIFY_CODE_ASYNC,
  RESET_PASSWORD_ASYNC,
  UPDATE_PASSWORD_ASYNC,
  EDIT_ACCOUNT_ASYNC,
  CHANGE_PASSWORD_ASYNC,
  OPEN_USER_POPUP,
  CLOSE_USER_POPUP,
  type TFetchUserAction,
  type TLoginAction,
  type TLogoutAction,
  type TSendCodeAction,
  type TVerifyCodeAction,
  type TResetPasswordAction,
  type TUpdatePasswordAction,
  type TEditAccountAction,
  type TOpenPopupAction,
  type TChangePasswordAction,
  type TClosePopupAction,
  type TPopupType,
} from "../constants/user";


export const fetchUserAsync = (): TFetchUserAction => ({
  type: FETCH_USER_ASYNC,
});

export const loginAsync = (email: string, password: string): TLoginAction => ({
  type: LOGIN_ASYNC,
  payload: { email, password },
});

export const logoutUser = (): TLogoutAction => ({
  type: LOGOUT_USER,
});

export const sendCodeAsync = (email: string): TSendCodeAction => ({
  type: SEND_CODE_ASYNC,
  payload: { email },
});

export const verifyCodeAsync = (email: string, code: string): TVerifyCodeAction => ({
  type: VERIFY_CODE_ASYNC,
  payload: { email, code },
});

export const resetPasswordAsync = (email: string, password: string): TResetPasswordAction => ({
  type: RESET_PASSWORD_ASYNC,
  payload: { email, password },
});

export const updatePasswordAsync = (password: string, token: string): TUpdatePasswordAction => ({
  type: UPDATE_PASSWORD_ASYNC,
  payload: { password, token },
});

export const editAccountAsync = (formData: FormData): TEditAccountAction => ({
  type: EDIT_ACCOUNT_ASYNC,
  payload: { formData },
});

export const changePasswordAsync = (old: string, newPassword: string): TChangePasswordAction => ({
  type: CHANGE_PASSWORD_ASYNC,
  payload: { old, new: newPassword },
});

export const openPopup = (type: TPopupType): TOpenPopupAction => ({
  type: OPEN_USER_POPUP,
  payload: { type },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_USER_POPUP,
});
