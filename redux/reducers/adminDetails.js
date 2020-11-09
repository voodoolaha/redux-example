// @flow

import { type TAdmin } from "../../interface/admin";
import {
  FETCH_ADMIN_DETAILS_ASYNC,
  FETCH_ADMIN_DETAILS_SUCCESS,
  FETCH_ADMIN_DETAILS_ERROR,
  type TAdminDetailsActionTypes,
} from "../constants/adminDetails";


export type TAdminDetailsStore = {
  loading: boolean,
  fetchError: boolean,
  admin: ?TAdmin
};

const initialState: TAdminDetailsStore = {
  loading: false,
  fetchError: false,
  admin: null,
};

export const adminDetailsReducer = (
  state: TAdminDetailsStore = initialState,
  action: TAdminDetailsActionTypes,
): TAdminDetailsStore => {
  switch (action.type) {
    case FETCH_ADMIN_DETAILS_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMIN_DETAILS_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        fetchError: false,
        loading: false,
      };
    case FETCH_ADMIN_DETAILS_ERROR:
      return {
        ...state,
        fetchError: true,
        loading: false,
      };
    default:
      return state;
  }
};
