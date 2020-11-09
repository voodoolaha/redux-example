// @flow

import { type TIssue } from "../../interface/issue";
import { type TSla } from "../../interface/sla";
import { type TSlaRequestBody } from "../../pages/MaintenanceConfiguration/components/SLACreate/types";
import { type TAttachemetFromServer } from "../../pages/MaintenanceConfiguration/components/MaintenanceIssueCreate/types";

export const FETCH_MAINTENANCE_ISSUES_LIST_ASYNC: "FETCH_MAINTENANCE_ISSUES_LIST_ASYNC" = "FETCH_MAINTENANCE_ISSUES_LIST_ASYNC";
export const FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS: "FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS" = "FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS";
export const FETCH_MAINTENANCE_ISSUES_LIST_ERROR: "FETCH_MAINTENANCE_ISSUES_LIST_ERROR" = "FETCH_MAINTENANCE_ISSUES_LIST_ERROR";

export const CREATE_ISSUE_ASYNC: "CREATE_ISSUE_ASYNC" = "CREATE_ISSUE_ASYNC";
export const CREATE_ISSUE_SUCCESS: "CREATE_ISSUE_SUCCESS" = "CREATE_ISSUE_SUCCESS";
export const CREATE_ISSUE_ERROR: "CREATE_ISSUE_ERROR" = "CREATE_ISSUE_ERROR";

export const UPDATE_ISSUE_ASYNC: "UPDATE_ISSUE_ASYNC" = "UPDATE_ISSUE_ASYNC";
export const UPDATE_ISSUE_SUCCESS: "UPDATE_ISSUE_SUCCESS" = "UPDATE_ISSUE_SUCCESS";
export const UPDATE_ISSUE_ERROR: "UPDATE_ISSUE_ERROR" = "UPDATE_ISSUE_ERROR";

export const DELETE_ISSUE_ASYNC: "DELETE_ISSUE_ASYNC" = "DELETE_ISSUE_ASYNC";
export const DELETE_ISSUE_SUCCESS: "DELETE_ISSUE_SUCCESS" = "DELETE_ISSUE_SUCCESS";
export const DELETE_ISSUE_ERROR: "DELETE_ISSUE_ERROR" = "DELETE_ISSUE_ERROR";

export const FETCH_MAINTENANCE_SLA_LIST_ASYNC: "FETCH_MAINTENANCE_SLA_LIST_ASYNC" = "FETCH_MAINTENANCE_SLA_LIST_ASYNC";
export const FETCH_MAINTENANCE_SLA_LIST_SUCCESS: "FETCH_MAINTENANCE_SLA_LIST_SUCCESS" = "FETCH_MAINTENANCE_SLA_LIST_SUCCESS";
export const FETCH_MAINTENANCE_SLA_LIST_ERROR: "FETCH_MAINTENANCE_SLA_LIST_ERROR" = "FETCH_MAINTENANCE_SLA_LIST_ERROR";

export const CREATE_SLA_ASYNC: "CREATE_SLA_ASYNC" = "CREATE_SLA_ASYNC";
export const CREATE_SLA_SUCCESS: "CREATE_SLA_SUCCESS" = "CREATE_SLA_SUCCESS";
export const CREATE_SLA_ERROR: "CREATE_SLA_ERROR" = "CREATE_SLA_ERROR";

export const UPDATE_SLA_ASYNC: "UPDATE_SLA_ASYNC" = "UPDATE_SLA_ASYNC";
export const UPDATE_SLA_SUCCESS: "UPDATE_SLA_SUCCESS" = "UPDATE_SLA_SUCCESS";
export const UPDATE_SLA_ERROR: "UPDATE_SLA_ERROR" = "UPDATE_SLA_ERROR";

export const DELETE_SLA_ASYNC: "DELETE_SLA_ASYNC" = "DELETE_SLA_ASYNC";
export const DELETE_SLA_SUCCESS = "DELETE_SLA_SUCCESS";
export const DELETE_SLA_ERROR = "DELETE_SLA_ERROR";

export const GET_ISSUE_ATTACHMENTS_ASYNC: "GET_ISSUE_ATTACHMENTS_ASYNC" = "GET_ISSUE_ATTACHMENTS_ASYNC";
export const GET_ISSUE_ATTACHMENTS_SUCCESS: "GET_ISSUE_ATTACHMENTS_SUCCESS" = "GET_ISSUE_ATTACHMENTS_SUCCESS";
export const GET_ISSUE_ATTACHMENTS_ERROR: "GET_ISSUE_ATTACHMENTS_ERROR" = "GET_ISSUE_ATTACHMENTS_ERROR";

export const OPEN_ISSUE_POPUP: "OPEN_ISSUE_POPUP" = "OPEN_ISSUE_POPUP";
export const CLOSE_ISSUE_POPUP: "CLOSE_ISSUE_POPUP" = "CLOSE_ISSUE_POPUP";

export const OPEN_SLA_POPUP: "OPEN_SLA_POPUP" = "OPEN_SLA_POPUP";
export const CLOSE_SLA_POPUP: "CLOSE_SLA_POPUP" = "CLOSE_SLA_POPUP";

// client initiated actions
export type TFetchIssuesAction = {
  type: typeof FETCH_MAINTENANCE_ISSUES_LIST_ASYNC,
}

export type TFetchSLAAction = {
  type: typeof FETCH_MAINTENANCE_SLA_LIST_ASYNC,
}

export type TCreateIssueAction = {
  type: typeof CREATE_ISSUE_ASYNC,
  payload: {
    issue: FormData,
  }
}

export type TCreateSLAAction = {
  type: typeof CREATE_SLA_ASYNC,
  payload: {
    sla: TSlaRequestBody,
  }
}

export type TEditIssueAction = {
  type: typeof UPDATE_ISSUE_ASYNC,
  payload: {
    issue: TIssue,
  }
}

export type TEditSLAAction = {
  type: typeof UPDATE_SLA_ASYNC,
  payload: {
    sla: TSlaRequestBody,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_ISSUE_POPUP,
  payload: {
    issue: ?TIssue,
  }
}

export type TOpenPopupSLAAction = {
  type: typeof OPEN_SLA_POPUP,
  payload: {
    sla: ?TSla,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_ISSUE_POPUP,
}

export type TClosePopupSLAAction = {
  type: typeof CLOSE_SLA_POPUP,
}

export type TDeleteIssueAction = {
  type: typeof DELETE_ISSUE_ASYNC,
  payload: {
    id: number,
  }
}

export type TDeleteSLAAction = {
  type: typeof DELETE_SLA_ASYNC,
  payload: {
    id: number,
  }
}

export type TGetIssueAttachmentsAction = {
  type: typeof GET_ISSUE_ATTACHMENTS_ASYNC,
  payload: {
    id: number,
  }
}

// saga initiated actions
export type TFetchIssuesSuccessAction = {
  type: typeof FETCH_MAINTENANCE_ISSUES_LIST_SUCCESS,
  payload: {
    issues: Array<TIssue>
  }
}

export type TFetchIssuesErrorAction = {
type: typeof FETCH_MAINTENANCE_ISSUES_LIST_ERROR,
}

export type TFetchSLASuccessAction = {
  type: typeof FETCH_MAINTENANCE_SLA_LIST_SUCCESS,
  payload: {
    slas: Array<TSla>
  }
}

export type TFetchSLAErrorAction = {
  type: typeof FETCH_MAINTENANCE_SLA_LIST_ERROR,
}

export type TGetIssueAttachmentsSuccessAction = {
  type: typeof GET_ISSUE_ATTACHMENTS_SUCCESS,
  payload: {
    attachments: Array<TAttachemetFromServer>,
  }
}

export type TGetIssueAttachmentsErrorAction = {
  type: typeof GET_ISSUE_ATTACHMENTS_ERROR,
}

export type TIssueActionTypes = TFetchIssuesAction
  | TCreateIssueAction
  | TEditIssueAction
  | TDeleteIssueAction
  | TFetchIssuesSuccessAction
  | TFetchIssuesErrorAction
  | TOpenPopupAction
  | TClosePopupAction
  | TGetIssueAttachmentsAction
  | TGetIssueAttachmentsSuccessAction
  | TGetIssueAttachmentsErrorAction

export type TSLAActionTypes = TFetchSLAAction
  | TCreateSLAAction
  | TEditSLAAction
  | TDeleteSLAAction
  | TFetchSLASuccessAction
  | TFetchSLAErrorAction
  | TOpenPopupSLAAction
  | TClosePopupSLAAction
