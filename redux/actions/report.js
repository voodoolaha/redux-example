// @flow

import {
  FETCH_REPORT_ASYNC,
  CREATE_REPORT_ASYNC,
  OPEN_REPORT_POPUP,
  CLOSE_REPORT_POPUP,
  type TFetchReportsAction,
  type TCreaterReportAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/report";
import { type TReport } from "../../interface/report";

export const fetchReportAsync = (): TFetchReportsAction => ({
  type: FETCH_REPORT_ASYNC,
});

export const createReportAsync = (report: TReport): TCreaterReportAction => ({
  type: CREATE_REPORT_ASYNC,
  payload: { report },
});

export const openPopup = (report?: TReport): TOpenPopupAction => ({
  type: OPEN_REPORT_POPUP,
  payload: { report: report || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_REPORT_POPUP,
});
