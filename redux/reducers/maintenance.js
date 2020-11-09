// @flow

import { type TMaintenanceList, TMaintenance } from "../../interface/maintenance";
import {
  FETCH_MAINTENANCE_LIST_ASYNC,
  FETCH_MAINTENANCE_LIST_SUCCESS,
  FETCH_MAINTENANCE_LIST_ERROR,
  VIEW_MAINTENANCE_ASYNC,
  VIEW_MAINTENANCE_SUCCESS,
  VIEW_MAINTENANCE_ERROR,
  OPEN_MAINTENANCE_POPUP,
  CLOSE_MAINTENANCE_POPUP,
  CLEAN_SINGLE_MAINTENANCE,
  type TMaintenanceActionTypes,
} from "../constants/maintenance";

export type TMaintenanceStore = {
    maintenances: TMaintenanceList;
    loading: boolean;
    fetchError: boolean;
    popupOpened: boolean;
    maintenance: TMaintenance;
    popupItem: ?TMaintenance;
}

const initialState: TMaintenanceStore = {
  maintenances: {},
  loading: false,
  fetchError: false,
  popupOpened: false,
  maintenance: null,
  popupItem: null,
};

const maintenanceReducer = (
  state: TMaintenanceStore = initialState,
  action: TMaintenanceActionTypes,
) => {
  switch (action.type) {
    case OPEN_MAINTENANCE_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.maintenance,
      };
    case CLOSE_MAINTENANCE_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_MAINTENANCE_LIST_ASYNC:
      return { ...state, loading: true };
    case FETCH_MAINTENANCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        maintenances: action.payload.maintenances,
      };
    case FETCH_MAINTENANCE_LIST_ERROR:
      return { ...state, loading: false, fetchError: true };
    case VIEW_MAINTENANCE_ASYNC:
      return { ...state, loading: true };
    case VIEW_MAINTENANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        maintenance: action.payload.maintenance,
      };
    case VIEW_MAINTENANCE_ERROR:
      return { ...state, loading: false, fetchError: true };
    case CLEAN_SINGLE_MAINTENANCE:
      return { ...state, maintenance: null };
    default:
      return { ...state };
  }
};


export { maintenanceReducer };
