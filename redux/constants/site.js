// @flow

import { type TSite } from "../../interface/site";
import { type TFormData } from "../../pages/Sites/components/SitePopup/types";

export const FETCH_SITE_LIST_ASYNC: "FETCH_SITE_LIST_ASYNC" = "FETCH_SITE_LIST_ASYNC";
export const FETCH_SITE_LIST_SUCCESS: "FETCH_SITE_LIST_SUCCESS" = "FETCH_SITE_LIST_SUCCESS";
export const FETCH_SITE_LIST_ERROR: "FETCH_SITE_LIST_ERROR" = "FETCH_SITE_LIST_ERROR";

export const FETCH_SITES_STRUCTURE_ASYNC: "FETCH_SITES_STRUCTURE_ASYNC" = "FETCH_SITES_STRUCTURE_ASYNC";
export const FETCH_SITES_STRUCTURE_SUCCESS: "FETCH_SITES_STRUCTURE_SUCCESS" = "FETCH_SITES_STRUCTURE_SUCCESS";
export const FETCH_SITES_STRUCTURE_ERROR: "FETCH_SITES_STRUCTURE_ERROR" = "FETCH_SITES_STRUCTURE_ERROR";

export const FETCH_SITES_LOCATIONS_ASYNC: "FETCH_SITES_LOCATIONS_ASYNC" = "FETCH_SITES_LOCATIONS_ASYNC";
export const FETCH_SITES_LOCATIONS_SUCCESS: "FETCH_SITES_LOCATIONS_SUCCESS" = "FETCH_SITES_LOCATIONS_SUCCESS";
export const FETCH_SITES_LOCATIONS_ERROR: "FETCH_SITES_LOCATIONS_ERROR" = "FETCH_SITES_LOCATIONS_ERROR";

export const CREATE_SITE_ASYNC: "CREATE_SITE_ASYNC" = "CREATE_SITE_ASYNC";

export const EDIT_SITE_ASYNC: "EDIT_SITE_ASYNC" = "EDIT_SITE_ASYNC";

export const DELETE_SITE_ASYNC: "DELETE_SITE_ASYNC" = "DELETE_SITE_ASYNC";

export const OPEN_SITE_POPUP: "OPEN_SITE_POPUP" = "OPEN_SITE_POPUP";
export const CLOSE_SITE_POPUP: "CLOSE_SITE_POPUP" = "CLOSE_SITE_POPUP";


// client initiated actions
export type TFetchSiteListAction = {
  type: typeof FETCH_SITE_LIST_ASYNC,
}

export type TFetchSiteStructureAction = {
  type: typeof FETCH_SITES_STRUCTURE_ASYNC,
}

export type TFetchSitesLocationsAction = {
  type: typeof FETCH_SITES_LOCATIONS_ASYNC,
}

export type TCreateSiteAction = {
  type: typeof CREATE_SITE_ASYNC,
  payload: {
    site: TFormData
  }
}

export type TEditSiteAction = {
  type: typeof EDIT_SITE_ASYNC,
  payload: {
    site: TFormData
  }
}

export type TDeleteSiteAction = {
  type: typeof DELETE_SITE_ASYNC,
  payload: {
    id: number
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_SITE_POPUP,
  payload: {
    site: ?TSite
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_SITE_POPUP,
}

// saga initiated actions
export type TFetchSiteListSuccessAction = {
  type: typeof FETCH_SITE_LIST_SUCCESS,
  payload: {
    sites: Array<TSite>;
  }
}

export type TFetchSiteListErrorAction = {
  type: typeof FETCH_SITE_LIST_ERROR,
}

export type TFetchSiteStructureSuccessAction = {
  type: typeof FETCH_SITES_STRUCTURE_SUCCESS,
  payload: {
    structure: Object;
  }
}

export type TFetchSiteStructureErrorAction = {
  type: typeof FETCH_SITES_STRUCTURE_ERROR,
}

export type TFetchSitesLocationsSuccessAction = {
  type: typeof FETCH_SITES_LOCATIONS_SUCCESS,
  payload: {
    locations: Object,
  }
}

export type TFetchSitesLocationsErrorAction = {
  type: typeof FETCH_SITES_LOCATIONS_ERROR,
}


export type TSiteActionTypes = TFetchSiteListAction
  | TFetchSiteStructureAction
  | TCreateSiteAction
  | TEditSiteAction
  | TDeleteSiteAction
  | TOpenPopupAction
  | TClosePopupAction
  | TFetchSiteListSuccessAction
  | TFetchSiteListErrorAction
  | TFetchSiteStructureSuccessAction
  | TFetchSiteStructureErrorAction
  | TFetchSitesLocationsAction
  | TFetchSitesLocationsSuccessAction
  | TFetchSitesLocationsErrorAction
