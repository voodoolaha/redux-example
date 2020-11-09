// @flow

import { type TResident } from "../../interface/resident";
import { type TUploadableResident } from "../../pages/ResidentManagement/types";

export const FETCH_RESIDENT_LIST_ASYNC: "FETCH_RESIDENT_LIST_ASYNC" = "FETCH_RESIDENT_LIST_ASYNC";
export const FETCH_RESIDENT_LIST_SUCCESS: "FETCH_RESIDENT_LIST_SUCCESS" = "FETCH_RESIDENT_LIST_SUCCESS";
export const FETCH_RESIDENT_LIST_ERROR: "FETCH_RESIDENT_LIST_ERROR" = "FETCH_RESIDENT_LIST_ERROR";

export const FETCH_RESIDENT_ASYNC: "FETCH_RESIDENT_ASYNC" = "FETCH_RESIDENT_ASYNC";
export const FETCH_RESIDENT_SUCCESS: "FETCH_RESIDENT_SUCCESS" = "FETCH_RESIDENT_SUCCESS";
export const FETCH_RESIDENT_ERROR: "FETCH_RESIDENT_ERROR" = "FETCH_RESIDENT_ERROR";

export const UPLOAD_RESIDENT_LIST: "UPLOAD_RESIDENT_LIST" = "UPLOAD_RESIDENT_LIST";
export const RESIDENT_LIST_UPLOAD_FINISHED: "RESIDENT_LIST_UPLOAD_FINISHED" = "RESIDENT_LIST_UPLOAD_FINISHED";


export type TFetchResidentListAction = {
  type: typeof FETCH_RESIDENT_LIST_ASYNC,
}

export type TFetchResidentListSuccessAction = {
  type: typeof FETCH_RESIDENT_LIST_SUCCESS,
  payload: {
    residents: Array<TResident>,
  }
}

export type TFetchResidentListErrorAction = {
  type: typeof FETCH_RESIDENT_LIST_ERROR,
}

export type TFetchResidentAction = {
  type: typeof FETCH_RESIDENT_ASYNC,
  payload: {
    id: number,
  }
}

export type TFetchResidentSuccessAction = {
  type: typeof FETCH_RESIDENT_SUCCESS,
  payload: {
    resident: TResident,
  }
}

export type TFetchResidentErrorAction = {
  type: typeof FETCH_RESIDENT_ERROR,
}

export type TUploadResidentListAction = {
  type: typeof UPLOAD_RESIDENT_LIST,
  payload: {
    residents: Array<TUploadableResident>,
  }
}

export type TUploadFinishedAction = {
  type: typeof RESIDENT_LIST_UPLOAD_FINISHED,
}

export type TResidentActionTypes = TFetchResidentListAction
  | TFetchResidentListSuccessAction
  | TFetchResidentListErrorAction
  | TFetchResidentAction
  | TFetchResidentSuccessAction
  | TFetchResidentErrorAction
  | TUploadResidentListAction
  | TUploadFinishedAction
