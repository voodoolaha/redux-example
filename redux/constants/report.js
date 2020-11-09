// @flow

import { type TReport } from "../../interface/report";

export const FETCH_REPORT_ASYNC: "FETCH_REPORT_ASYNC" = "FETCH_REPORT_ASYNC";
export const FETCH_REPORT_SUCCESS: "FETCH_REPORT_SUCCESS" = "FETCH_REPORT_SUCCESS";
export const FETCH_REPORT_ERROR: "FETCH_MAINTENANCE_LIST_ERROR" = "FETCH_MAINTENANCE_LIST_ERROR";

export const CREATE_REPORT_ASYNC: "CREATE_REPORT_ASYNC" = "CREATE_REPORT_ASYNC";
export const CREATE_REPORT_SUCCESS: "CREATE_REPORT_SUCCESS" = "CREATE_REPORT_SUCCESS";
export const CREATE_REPORT_ERROR: "CREATE_MAINTENANCE_LIST_ERROR" = "CREATE_MAINTENANCE_LIST_ERROR";

export const OPEN_REPORT_POPUP: "OPEN_REPORT_POPUP" = "OPEN_REPORT_POPUP";
export const CLOSE_REPORT_POPUP: "CLOSE_REPORT_POPUP" = "CLOSE_REPORT_POPUP";

export type TFetchReportsAction = {
  type: typeof FETCH_REPORT_ASYNC,
}

export type TCreaterReportAction = {
  type: typeof CREATE_REPORT_ASYNC,
  payload: {
    report: TReport,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_REPORT_POPUP,
  payload: {
    report: ?TReport,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_REPORT_POPUP,
}

// saga initiated actions
export type TFetchrReportsSuccessAction = {
  type: typeof FETCH_REPORT_SUCCESS,
  payload: {
    reports: Array<TReport>
  }
}

export type TFetchReportsErrorAction = {
type: typeof FETCH_REPORT_ERROR,
}

export type TReportActionTypes = TFetchReportsAction
  | TCreaterReportAction
  | TFetchrReportsSuccessAction
  | TFetchReportsErrorAction
  | TOpenPopupAction
  | TClosePopupAction
