// @flow

import { type TReport } from "../../interface/report";
import {
  FETCH_REPORT_ASYNC,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_ERROR,
  OPEN_REPORT_POPUP,
  CLOSE_REPORT_POPUP,
  type TReportActionTypes,
} from "../constants/report";

export type TReportStore = {
    reports: Array<TReport>;
    loading: boolean;
    fetchError: boolean;
    popupOpened: boolean;
    report: TReport;
}

const initialState: TReportStore = {
  reports: [],
  loading: false,
  fetchError: false,
  popupOpened: false,
  report: null,
};

export const reportReducer = (
  state: TReportStore = initialState,
  action: TReportActionTypes,
) => {
  switch (action.type) {
    case OPEN_REPORT_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.report,
      };
    case CLOSE_REPORT_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_REPORT_ASYNC:
      return { ...state, loading: true };
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        reports: action.payload.reports,
      };
    case FETCH_REPORT_ERROR:
      return { ...state, loading: false, fetchError: true };
    default:
      return { ...state };
  }
};
