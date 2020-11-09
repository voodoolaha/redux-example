// @flow

import { type TDelivery, type TDeliveryList } from "../../interface/delivery";
import {
  FETCH_DELIVERY_LIST_ASYNC,
  FETCH_DELIVERY_LIST_SUCCESS,
  FETCH_DELIVERY_LIST_ERROR,
  FETCH_DELIVERY_ASYNC,
  FETCH_DELIVERY_SUCCESS,
  FETCH_DELIVERY_ERROR,
  OPEN_DELIVERY_POPUP,
  CLOSE_DELIVERY_POPUP,
  type TDeliveryActionTypes,
} from "../constants/deliveries";


export type TDeliveryStore = {
  deliveries: ?TDeliveryList,
  delivery: ?TDelivery,
  loading: boolean,
  fetchError: boolean,
  popupOpened: boolean,
  popupItem: ?TDelivery,
}

const initialState: TDeliveryStore = {
  deliveries: null,
  delivery: null,
  loading: false,
  fetchError: false,
  popupOpened: false,
  popupItem: null,
};


export const deliveryReducer = (
  state: TDeliveryStore = initialState,
  action: TDeliveryActionTypes,
): TDeliveryStore => {
  switch (action.type) {
    case OPEN_DELIVERY_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.delivery,
      };
    case CLOSE_DELIVERY_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_DELIVERY_LIST_ASYNC:
      return {
        ...state,
        fetchError: false,
        loading: true,
      };
    case FETCH_DELIVERY_LIST_SUCCESS:
      return {
        ...state,
        fetchError: false,
        loading: false,
        deliveries: action.payload.deliveries,
      };
    case FETCH_DELIVERY_LIST_ERROR:
      return {
        ...state,
        fetchError: true,
        loading: false,
        deliveries: null,
      };
    case FETCH_DELIVERY_ASYNC:
      return {
        ...state,
        fetchError: false,
        loading: true,
      };
    case FETCH_DELIVERY_SUCCESS:
      return {
        ...state,
        fetchError: false,
        loading: false,
        delivery: action.payload.delivery,
      };
    case FETCH_DELIVERY_ERROR:
      return {
        ...state,
        fetchError: true,
        loading: true,
        delivery: null,
      };
    default:
      return state;
  }
};
