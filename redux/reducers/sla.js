// @flow

import { type TSla } from "../../interface/sla";
import {
  FETCH_MAINTENANCE_SLA_LIST_ASYNC,
  FETCH_MAINTENANCE_SLA_LIST_SUCCESS,
  FETCH_MAINTENANCE_SLA_LIST_ERROR,
  OPEN_SLA_POPUP,
  CLOSE_SLA_POPUP,
  type TSLAActionTypes,
} from "../constants/maintenanceIssue";

export type TSLAStore = {
  slas: TSla[];
  loading: boolean;
  fetchError: boolean;
  popupOpen: boolean;
  sla: ?TSla;
  popupSla: ?TSla;
}

const initialState: TSLAStore = {
  slas: [],
  loading: false,
  fetchError: false,
  popupOpen: false,
  sla: null,
  popupSla: null,
};

export const SLAReducer = (
  state: TSLAStore = initialState,
  action: TSLAActionTypes,
) => {
  switch (action.type) {
    case OPEN_SLA_POPUP:
      return {
        ...state,
        popupOpen: true,
        popupSla: action.payload.sla,
      };
    case CLOSE_SLA_POPUP:
      return {
        ...state,
        popupOpen: false,
        popupSla: null,
      };
    case FETCH_MAINTENANCE_SLA_LIST_ASYNC:
      return { ...state, loading: true };
    case FETCH_MAINTENANCE_SLA_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        slas: action.payload.slas,
      };
    case FETCH_MAINTENANCE_SLA_LIST_ERROR:
      return { ...state, loading: false, fetchError: true };
    default:
      return { ...state };
  }
};
