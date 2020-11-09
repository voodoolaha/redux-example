// @flow

import { type TFormData } from "../../pages/Sites/components/SitePopup/types";
import { type TSite } from "../../interface/site";
import {
  FETCH_SITE_LIST_ASYNC,
  FETCH_SITES_STRUCTURE_ASYNC,
  FETCH_SITES_LOCATIONS_ASYNC,
  CREATE_SITE_ASYNC,
  EDIT_SITE_ASYNC,
  DELETE_SITE_ASYNC,
  OPEN_SITE_POPUP,
  CLOSE_SITE_POPUP,
  type TFetchSiteListAction,
  type TFetchSiteStructureAction,
  type TFetchSitesLocationsAction,
  type TCreateSiteAction,
  type TEditSiteAction,
  type TDeleteSiteAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/site";


export const fetchSitesAsync = (): TFetchSiteListAction => ({
  type: FETCH_SITE_LIST_ASYNC,
});

export const fetchSitesStructureAsync = (): TFetchSiteStructureAction => ({
  type: FETCH_SITES_STRUCTURE_ASYNC,
});

export const fetchSitesLocationsAsync = (): TFetchSitesLocationsAction => ({
  type: FETCH_SITES_LOCATIONS_ASYNC,
});

export const createSiteAsync = (site: TFormData): TCreateSiteAction => ({
  type: CREATE_SITE_ASYNC,
  payload: { site },
});

export const editSiteAsync = (site: TFormData): TEditSiteAction => ({
  type: EDIT_SITE_ASYNC,
  payload: { site },
});

export const deleteSiteAsync = (id: number): TDeleteSiteAction => ({
  type: DELETE_SITE_ASYNC,
  payload: { id },
});

export const openPopup = (site?: TSite): TOpenPopupAction => ({
  type: OPEN_SITE_POPUP,
  payload: { site: site || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_SITE_POPUP,
});
