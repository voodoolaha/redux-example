// @flow

import { type TWellbeingResource } from "../../interface/wellbeingResource";
import { type TFormData } from "../../pages/WellbeingContent/components/ResourcePopup/types";

export const FETCH_RESOURCE_LIST_ASYNC: "FETCH_RESOURCE_LIST_ASYNC" = "FETCH_RESOURCE_LIST_ASYNC";
export const FETCH_RESOURCE_LIST_SUCCESS: "FETCH_RESOURCE_LIST_SUCCESS" = "FETCH_RESOURCE_LIST_SUCCESS";
export const FETCH_RESOURCE_LIST_ERROR: "FETCH_RESOURCE_LIST_ERROR" = "FETCH_RESOURCE_LIST_ERROR";

export const CREATE_RESOURCE_ASYNC: "CREATE_RESOURCE_ASYNC" = "CREATE_RESOURCE_ASYNC";

export const EDIT_RESOURCE_ASYNC: "EDIT_RESOURCE_ASYNC" = "EDIT_RESOURCE_ASYNC";

export const DELETE_RESOURCE_ASYNC: "DELETE_RESOURCE_ASYNC" = "DELETE_RESOURCE_ASYNC";

export const OPEN_RESOURCE_POPUP: "OPEN_RESOURCE_POPUP" = "OPEN_RESOURCE_POPUP";
export const CLOSE_RESOURCE_POPUP: "CLOSE_RESOURCE_POPUP" = "CLOSE_RESOURCE_POPUP";


// client initiated actions
export type TFetchResourceListAction = {
  type: typeof FETCH_RESOURCE_LIST_ASYNC,
}

export type TCreateResourceAction = {
  type: typeof CREATE_RESOURCE_ASYNC,
  payload: {
    resource: TFormData
  }
}

export type TEditResourceAction = {
  type: typeof EDIT_RESOURCE_ASYNC,
  payload: {
    resource: TFormData
  }
}

export type TDeleteResourceAction = {
  type: typeof DELETE_RESOURCE_ASYNC,
  payload: {
    id: number
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_RESOURCE_POPUP,
  payload: {
    resource: ?TWellbeingResource
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_RESOURCE_POPUP,
}


// saga's initiated action
export type TFetchResourceListSuccessAction = {
  type: typeof FETCH_RESOURCE_LIST_SUCCESS,
  payload: {
    resources: Array<TWellbeingResource>;
  }
}

export type TFetchResourceListErrorAction = {
  type: typeof FETCH_RESOURCE_LIST_ERROR,
}


export type TWellbeingResourceActionTypes = TFetchResourceListAction
  | TFetchResourceListSuccessAction
  | TFetchResourceListErrorAction
  | TCreateResourceAction
  | TEditResourceAction
  | TOpenPopupAction
  | TClosePopupAction
