// @flow

import { type TWellbeingResource } from "../../interface/wellbeingResource";
import {
  FETCH_RESOURCE_LIST_ASYNC,
  FETCH_RESOURCE_LIST_ERROR,
  FETCH_RESOURCE_LIST_SUCCESS,
  OPEN_RESOURCE_POPUP,
  CLOSE_RESOURCE_POPUP,
  type TWellbeingResourceActionTypes,
} from "../constants/wellbeingResources";

export type TWellbeingResourceStore = {
  resources: Array<TWellbeingResource>;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  popupItem: ?TWellbeingResource;
}

const initialState: TWellbeingResourceStore = {
  resources: [],
  loading: false,
  fetchError: false,
  popupOpened: false,
  popupItem: null,
};

export const wellbeingResourcesReducer = (
  state: TWellbeingResourceStore = initialState,
  action: TWellbeingResourceActionTypes,
): TWellbeingResourceStore => {
  switch (action.type) {
    case OPEN_RESOURCE_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.resource,
      };
    case CLOSE_RESOURCE_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_RESOURCE_LIST_ASYNC:
      return {
        ...state,
        loading: true,
        fetchError: false,
      };
    case FETCH_RESOURCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        resources: action.payload.resources,
      };
    case FETCH_RESOURCE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return state;
  }
};
