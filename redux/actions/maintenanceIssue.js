// @flow

import { type TSlaRequestBody } from "../../pages/MaintenanceConfiguration/components/SLACreate/types";

import {
  FETCH_MAINTENANCE_ISSUES_LIST_ASYNC,
  CREATE_ISSUE_ASYNC,
  UPDATE_ISSUE_ASYNC,
  DELETE_ISSUE_ASYNC,
  FETCH_MAINTENANCE_SLA_LIST_ASYNC,
  CREATE_SLA_ASYNC,
  UPDATE_SLA_ASYNC,
  DELETE_SLA_ASYNC,
  OPEN_ISSUE_POPUP,
  CLOSE_ISSUE_POPUP,
  OPEN_SLA_POPUP,
  CLOSE_SLA_POPUP,
  GET_ISSUE_ATTACHMENTS_ASYNC,
  type TFetchIssuesAction,
  type TFetchSLAAction,
  type TCreateIssueAction,
  type TCreateSLAAction,
  type TEditIssueAction,
  type TEditSLAAction,
  type TDeleteIssueAction,
  type TDeleteSLAAction,
  type TOpenPopupAction,
  type TClosePopupAction,
  type TOpenPopupSLAAction,
  type TClosePopupSLAAction,
  type TGetIssueAttachmentsAction,
} from "../constants/maintenanceIssue";
import { type TIssue } from "../../interface/issue";
import { type TSla } from "../../interface/sla";

export const fetchMaintenanceIssuesListAsync = (): TFetchIssuesAction => ({
  type: FETCH_MAINTENANCE_ISSUES_LIST_ASYNC,
});

export const createIssueAsync = (issue: FormData): TCreateIssueAction => ({
  type: CREATE_ISSUE_ASYNC,
  payload: { issue },
});

export const updateIssueAsync = (issue: FormData): TEditIssueAction => ({
  type: UPDATE_ISSUE_ASYNC,
  payload: { issue },
});

export const deleteIssueAsync = (id: number): TDeleteIssueAction => ({
  type: DELETE_ISSUE_ASYNC,
  payload: { id },
});

export const fetchMaintenanceSLAListAsync = (): TFetchSLAAction => ({
  type: FETCH_MAINTENANCE_SLA_LIST_ASYNC,
});

export const createSlaAsync = (sla: TSlaRequestBody): TCreateSLAAction => ({
  type: CREATE_SLA_ASYNC,
  payload: { sla },
});

export const updateSLAAsync = (sla: TSlaRequestBody): TEditSLAAction => ({
  type: UPDATE_SLA_ASYNC,
  payload: { sla },
});

export const deleteSlaAsync = (id: number): TDeleteSLAAction => ({
  type: DELETE_SLA_ASYNC,
  payload: { id },
});

export const getIssueAttachments = (id: number): TGetIssueAttachmentsAction => ({
  type: GET_ISSUE_ATTACHMENTS_ASYNC,
  payload: { id },
});

export const openPopup = (issue?: TIssue): TOpenPopupAction => ({
  type: OPEN_ISSUE_POPUP,
  payload: { issue: issue || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_ISSUE_POPUP,
});

export const openPopupSLA = (sla?: TSla): TOpenPopupSLAAction => ({
  type: OPEN_SLA_POPUP,
  payload: { sla: sla || null },
});

export const closePopupSLA = (): TClosePopupSLAAction => ({
  type: CLOSE_SLA_POPUP,
});
