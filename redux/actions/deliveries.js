// @flow

import { type TDelivery } from "../../interface/delivery";
import { type TFormData, type TEditFormData } from "../../pages/DeliveryManagement/components/DeliveryPopup/types";
import {
  FETCH_DELIVERY_LIST_ASYNC,
  FETCH_DELIVERY_ASYNC,
  CREATE_DELIVERY_ASYNC,
  EDIT_DELIVERY_ASYNC,
  CHANGE_PARCEL_STATUS,
  OPEN_DELIVERY_POPUP,
  CLOSE_DELIVERY_POPUP,
  DELETE_DELIVERY_ASYNC,
  type TFetchDeliveryListAction,
  type TFetchDeliveryAction,
  type TCreateDeliveryAction,
  type TDeleteDeliveryAction,
  type TEditDeliveryAction,
  type TChangeParcelStatusAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/deliveries";


export const fetchDeliveryListAsync = (): TFetchDeliveryListAction => ({
  type: FETCH_DELIVERY_LIST_ASYNC,
});

export const fetchDeliveryAsync = (id: number): TFetchDeliveryAction => ({
  type: FETCH_DELIVERY_ASYNC,
  payload: { id },
});

export const createDeliveryAction = (formData: TFormData): TCreateDeliveryAction => ({
  type: CREATE_DELIVERY_ASYNC,
  payload: formData,
});

export const deleteDeliveryAsync = (id: number): TDeleteDeliveryAction => ({
  type: DELETE_DELIVERY_ASYNC,
  payload: { id },
});

export const editDeliveryAction = (formData: TEditFormData): TEditDeliveryAction => ({
  type: EDIT_DELIVERY_ASYNC,
  payload: formData,
});

export const changeParcelStatusAsync = (
  id: number,
  status: number,
  detailsPage: boolean,
): TChangeParcelStatusAction => ({
  type: CHANGE_PARCEL_STATUS,
  payload: {
    id,
    status,
    detailsPage,
  },
});

export const openPopup = (delivery?: TDelivery): TOpenPopupAction => ({
  type: OPEN_DELIVERY_POPUP,
  payload: { delivery: delivery || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_DELIVERY_POPUP,
});
