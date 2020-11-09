// @flow

import {
  FETCH_MAINTENANCE_LIST_ASYNC,
  CREATE_MAINTENANCE_ASYNC,
  UPDATE_MAINTENANCE_ASYNC,
  VIEW_MAINTENANCE_ASYNC,
  OPEN_MAINTENANCE_POPUP,
  CLOSE_MAINTENANCE_POPUP,
  CLEAN_SINGLE_MAINTENANCE,
  type TFetchMaintenancesAction,
  type TFetchMaintenanceAction,
  type TCreateMaintenanceAction,
  type TEditMaintenanceAction,
  type TCleanSingleMaintenanceAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/maintenance";
import { type TMaintenance } from "../../interface/maintenance";

export const fetchMaintenanceListAsync = (id): TFetchMaintenancesAction => ({
  type: FETCH_MAINTENANCE_LIST_ASYNC,
  payload: {id}
});

export const createMaintenanceAsync = (maintenance: FormData): TCreateMaintenanceAction => ({
  type: CREATE_MAINTENANCE_ASYNC,
  payload: { maintenance },
});

export const updateMaintenanceAsync = (
  maintenance: FormData,
  id: number,
): TEditMaintenanceAction => ({
  type: UPDATE_MAINTENANCE_ASYNC,
  payload: { maintenance, id },
});

export const viewMaintenanceAsync = (id: number): TFetchMaintenanceAction => ({
  type: VIEW_MAINTENANCE_ASYNC,
  payload: { id },
});

export const openPopup = (maintenance?: TMaintenance): TOpenPopupAction => ({
  type: OPEN_MAINTENANCE_POPUP,
  payload: { maintenance: maintenance || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_MAINTENANCE_POPUP,
});

export const cleanSingleMaintenance = (): TCleanSingleMaintenanceAction => ({
  type: CLEAN_SINGLE_MAINTENANCE,
});
