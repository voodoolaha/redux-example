// @flow

import { type TMaintenance, type TMaintenanceList } from "../../interface/maintenance";

export const FETCH_MAINTENANCE_LIST_ASYNC: "FETCH_MAINTENANCE_LIST_ASYNC" = "FETCH_MAINTENANCE_LIST_ASYNC";
export const FETCH_MAINTENANCE_LIST_SUCCESS: "FETCH_MAINTENANCE_LIST_SUCCESS" = "FETCH_MAINTENANCE_LIST_SUCCESS";
export const FETCH_MAINTENANCE_LIST_ERROR: "FETCH_MAINTENANCE_LIST_ERROR" = "FETCH_MAINTENANCE_LIST_ERROR";

export const CREATE_MAINTENANCE_ASYNC: "CREATE_MAINTENANCE_ASYNC" = "CREATE_MAINTENANCE_ASYNC";

export const UPDATE_MAINTENANCE_ASYNC: "UPDATE_MAINTENANCE_ASYNC" = "UPDATE_MAINTENANCE_ASYNC";

export const VIEW_MAINTENANCE_ASYNC: "VIEW_MAINTENANCE_ASYNC" = "VIEW_MAINTENANCE_ASYNC";
export const VIEW_MAINTENANCE_SUCCESS: "VIEW_MAINTENANCE_SUCCESS" = "VIEW_MAINTENANCE_SUCCESS";
export const VIEW_MAINTENANCE_ERROR: "VIEW_MAINTENANCE_ERROR" = "VIEW_MAINTENANCE_ERROR";

export const OPEN_MAINTENANCE_POPUP: "OPEN_MAINTENANCE_POPUP" = "OPEN_MAINTENANCE_POPUP";
export const CLOSE_MAINTENANCE_POPUP: "CLOSE_MAINTENANCE_POPUP" = "CLOSE_MAINTENANCE_POPUP";

export const CLEAN_SINGLE_MAINTENANCE: "CLEAN_SINGLE_MAINTENANCE" = "CLEAN_SINGLE_MAINTENANCE";


// client initiated actions
export type TFetchMaintenancesAction = {
  type: typeof FETCH_MAINTENANCE_LIST_ASYNC,
  payload: {
    id: number,
  }
}

export type TFetchMaintenanceAction = {
  type: typeof VIEW_MAINTENANCE_ASYNC,
  payload: {
    id: number,
  }
}

export type TCreateMaintenanceAction = {
  type: typeof CREATE_MAINTENANCE_ASYNC,
  payload: {
    maintenance: FormData,
  }
}

export type TEditMaintenanceAction = {
  type: typeof UPDATE_MAINTENANCE_ASYNC,
  payload: {
    maintenance: FormData,
    id: number,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_MAINTENANCE_POPUP,
  payload: {
    maintenance: ?TMaintenance,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_MAINTENANCE_POPUP,
}

// saga initiated actions
export type TFetchMaintenancesSuccessAction = {
  type: typeof FETCH_MAINTENANCE_LIST_SUCCESS,
  payload: {
    maintenances: TMaintenanceList
  }
}

export type TFetchMaintenancesErrorAction = {
type: typeof FETCH_MAINTENANCE_LIST_ERROR,
}

export type TFetchMaintenanceSuccessAction = {
  type: typeof VIEW_MAINTENANCE_SUCCESS,
  payload: {
    maintenance: TMaintenance,
  }
}

export type TFetchMaintenanceErrorAction = {
  type: typeof VIEW_MAINTENANCE_ERROR,
}

export type TCleanSingleMaintenanceAction = {
  type: typeof CLEAN_SINGLE_MAINTENANCE,
}

export type TMaintenanceActionTypes = TFetchMaintenancesAction
  | TFetchMaintenanceAction
  | TCreateMaintenanceAction
  | TEditMaintenanceAction
  | TFetchMaintenancesSuccessAction
  | TFetchMaintenancesErrorAction
  | TFetchMaintenanceSuccessAction
  | TFetchMaintenanceErrorAction
  | TOpenPopupAction
  | TClosePopupAction
  | TCleanSingleMaintenanceAction
