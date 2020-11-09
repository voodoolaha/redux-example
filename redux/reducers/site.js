// @flow

import { type TSite } from "../../interface/site";
import {
  FETCH_SITE_LIST_ASYNC,
  FETCH_SITE_LIST_SUCCESS,
  FETCH_SITE_LIST_ERROR,
  FETCH_SITES_STRUCTURE_ASYNC,
  FETCH_SITES_STRUCTURE_SUCCESS,
  FETCH_SITES_STRUCTURE_ERROR,
  FETCH_SITES_LOCATIONS_ASYNC,
  FETCH_SITES_LOCATIONS_SUCCESS,
  FETCH_SITES_LOCATIONS_ERROR,
  OPEN_SITE_POPUP,
  CLOSE_SITE_POPUP,
  type TSiteActionTypes,
} from "../constants/site";


type TStructure<T> = {
  data: T;
  loading: boolean;
  error: boolean;
}

export type TSiteStorage = {
  sites: TStructure<Array<TSite>>;
  siteStructure: TStructure<Object>;
  locations: TStructure<Object>;
  popupOpened: boolean;
  popupItem: ?TSite;
}


const initialState: TSiteStorage = {
  sites: {
    data: [],
    loading: false,
    error: false,
  },
  siteStructure: {
    data: {},
    loading: false,
    error: false,
  },
  locations: {
    data: {},
    loading: false,
    error: false,
  },
  popupOpened: false,
  popupItem: null,
};


export const siteReducer = (
  state: TSiteStorage = initialState,
  action: TSiteActionTypes,
): TSiteStorage => {
  switch (action.type) {
    case OPEN_SITE_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.site,
      };
    case CLOSE_SITE_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_SITE_LIST_ASYNC:
      return {
        ...state,
        sites: {
          ...state.sites,
          loading: true,
        },
      };
    case FETCH_SITE_LIST_SUCCESS:
      return {
        ...state,
        sites: {
          loading: false,
          error: false,
          data: action.payload.sites,
        },
      };
    case FETCH_SITE_LIST_ERROR:
      return {
        ...state,
        sites: {
          ...state.sites,
          loading: false,
          error: true,
        },
      };
    case FETCH_SITES_STRUCTURE_ASYNC:
      return {
        ...state,
        siteStructure: {
          ...state.siteStructure,
          loading: true,
        },
      };
    case FETCH_SITES_STRUCTURE_SUCCESS:
      return {
        ...state,
        siteStructure: {
          loading: false,
          error: false,
          data: action.payload.structure,
        },
      };
    case FETCH_SITES_STRUCTURE_ERROR:
      return {
        ...state,
        siteStructure: {
          ...state.siteStructure,
          loading: false,
          error: true,
        },
      };
    case FETCH_SITES_LOCATIONS_ASYNC:
      return {
        ...state,
        locations: {
          ...state.locations,
          loading: true,
        },
      };
    case FETCH_SITES_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: {
          data: action.payload.locations,
          loading: false,
          error: false,
        },
      };
    case FETCH_SITES_LOCATIONS_ERROR:
      return {
        ...state,
        locations: {
          ...state.locations,
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};
