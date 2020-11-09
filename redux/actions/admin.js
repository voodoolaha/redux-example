// @flow

import { type TAdmin } from "../../interface/admin";
import {
  FETCH_ADMIN_LIST_ASYNC,
  CREATE_ADMIN_ASYNC,
  DELETE_ADMIN_ASYNC,
  EDIT_ADMIN_ASYNC,
  OPEN_ADMIN_POPUP,
  CLOSE_ADMIN_POPUP,
  type TFetchAdminListAction,
  type TCreateAdminAction,
  type TEditAdminAction,
  type TDeleteAdminAction,
  type TOpenPopup,
  type TClosePopup,
} from "../constants/admin";


export const fetchAdminListAsync = (): TFetchAdminListAction => ({
  type: FETCH_ADMIN_LIST_ASYNC,
});

export const createAdminAsync = (admin: FormData): TCreateAdminAction => ({
  type: CREATE_ADMIN_ASYNC,
  payload: { admin },
});

export const editAdminAsync = (admin: FormData, id: number): TEditAdminAction => ({
  type: EDIT_ADMIN_ASYNC,
  payload: { admin, id },
});

export const deleteAdminAsync = (id: number): TDeleteAdminAction => ({
  type: DELETE_ADMIN_ASYNC,
  payload: { id },
});

export const openPopup = (admin?: TAdmin): TOpenPopup => ({
  type: OPEN_ADMIN_POPUP,
  payload: { admin: admin || null },
});

export const closePopup = (): TClosePopup => ({
  type: CLOSE_ADMIN_POPUP,
});
