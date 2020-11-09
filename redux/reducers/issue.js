// @flow

import { type TIssue } from "../../interface/issue";
import { type TAttachemetFromServer } from "../../pages/MaintenanceConfiguration/components/MaintenanceIssueCreate/types";

import {
  FETCH_MAINTENANCE_ISSUES_LIST_ASYNC,
  FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS,
  FETCH_MAINTENANCE_ISSUES_LIST_ERROR,
  GET_ISSUE_ATTACHMENTS_SUCCESS,
  GET_ISSUE_ATTACHMENTS_ERROR,
  OPEN_ISSUE_POPUP,
  CLOSE_ISSUE_POPUP,
  type TIssueActionTypes,
} from "../constants/maintenanceIssue";

export type TIssueStore = {
  issues: TIssue[];
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  issue: ?TIssue;
  popupItem: ?TIssue;
  attachments: Array<TAttachemetFromServer>,
}

const initialState: TIssueStore = {
  issues: [],
  loading: false,
  fetchError: false,
  popupOpened: false,
  issue: null,
  popupItem: null,
  attachments: [],
};

export const IssueReducer = (
  state: TIssueStore = initialState,
  action: TIssueActionTypes,
): TIssueStore => {
  switch (action.type) {
    case OPEN_ISSUE_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.issue,
      };
    case CLOSE_ISSUE_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
        attachments: [],
      };
    case FETCH_MAINTENANCE_ISSUES_LIST_ASYNC:
      return { ...state, loading: true };
    case FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        issues: action.payload.issues,
      };
    case FETCH_MAINTENANCE_ISSUES_LIST_ERROR:
      return { ...state, loading: false, fetchError: true };
    case GET_ISSUE_ATTACHMENTS_SUCCESS:
      return { ...state, attachments: action.payload.attachments || [] };
    case GET_ISSUE_ATTACHMENTS_ERROR:
      return { ...state, attachments: [] };
    default:
      return { ...state };
  }
};
