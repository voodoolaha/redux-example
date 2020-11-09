// @flow

import { type TDelivery, type TDeliveryList } from "../../interface/delivery";
import { type TFormData, type TEditFormData } from "../../pages/DeliveryManagement/components/DeliveryPopup/types";

export const FETCH_DELIVERY_LIST_ASYNC: "FETCH_DELIVERY_LIST_ASYNC" = "FETCH_DELIVERY_LIST_ASYNC";
export const FETCH_DELIVERY_LIST_SUCCESS: "FETCH_DELIVERY_LIST_SUCCESS" = "FETCH_DELIVERY_LIST_SUCCESS";
export const FETCH_DELIVERY_LIST_ERROR: "FETCH_DELIVERY_LIST_ERROR" = "FETCH_DELIVERY_LIST_ERROR";

export const FETCH_DELIVERY_ASYNC: "FETCH_DELIVERY_ASYNC" = "FETCH_DELIVERY_ASYNC";
export const FETCH_DELIVERY_SUCCESS: "FETCH_DELIVERY_SUCCESS" = "FETCH_DELIVERY_SUCCESS";
export const FETCH_DELIVERY_ERROR: "FETCH_DELIVERY_ERROR" = "FETCH_DELIVERY_ERROR";

export const CREATE_DELIVERY_ASYNC: "CREATE_DELIVERY_ASYNC" = "CREATE_DELIVERY_ASYNC";

export const EDIT_DELIVERY_ASYNC: "EDIT_DELIVERY_ASYNC" = "EDIT_DELIVERY_ASYNC";

export const DELETE_DELIVERY_ASYNC: "DELETE_DELIVERY_ASYNC" = "DELETE_DELIVERY_ASYNC";

export const CHANGE_PARCEL_STATUS: "CHANGE_PARCEL_STATUS" = "CHANGE_PARCEL_STATUS";

export const OPEN_DELIVERY_POPUP: "OPEN_DELIVERY_POPUP" = "OPEN_DELIVERY_POPUP";
export const CLOSE_DELIVERY_POPUP: "CLOSE_DELIVERY_POPUP" = "CLOSE_DELIVERY_POPUP";


// client initiated actions
export type TFetchDeliveryListAction = {
  type: typeof FETCH_DELIVERY_LIST_ASYNC,
}

export type TFetchDeliveryAction = {
  type: typeof FETCH_DELIVERY_ASYNC,
  payload: {
    id: number,
  }
}

export type TCreateDeliveryAction = {
  type: typeof CREATE_DELIVERY_ASYNC,
  payload: TFormData,
}

export type TDeleteDeliveryAction = {
  type: typeof DELETE_DELIVERY_ASYNC,
  payload: {
    id: number
  }
}

export type TEditDeliveryAction = {
  type: typeof EDIT_DELIVERY_ASYNC,
  payload: TEditFormData,
}

export type TChangeParcelStatusAction = {
  type: typeof CHANGE_PARCEL_STATUS,
  payload: {
    id: number,
    status: number,
    detailsPage: boolean,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_DELIVERY_POPUP,
  payload: {
    delivery: ?TDelivery,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_DELIVERY_POPUP,
}

// saga initiated actions
export type TFetchDeliveryListSuccessAction = {
  type: typeof FETCH_DELIVERY_LIST_SUCCESS,
  payload: {
    deliveries: TDeliveryList,
  }
}

export type TFetchDeliveryListErrorAction = {
  type: typeof FETCH_DELIVERY_LIST_ERROR
}

export type TFetchDeliverySuccessAction = {
  type: typeof FETCH_DELIVERY_SUCCESS,
  payload: {
    delivery: TDelivery,
  }
}

export type TFetchDeliveryErrorAction = {
  type: typeof FETCH_DELIVERY_ERROR,
}


export type TDeliveryActionTypes = TFetchDeliveryListAction
  | TCreateDeliveryAction
  | TEditDeliveryAction
  | TChangeParcelStatusAction
  | TFetchDeliveryListSuccessAction
  | TFetchDeliveryListErrorAction
  | TFetchDeliveryAction
  | TFetchDeliverySuccessAction
  | TFetchDeliveryErrorAction
  | TOpenPopupAction
  | TClosePopupAction
