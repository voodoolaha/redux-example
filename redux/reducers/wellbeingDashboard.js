// @flow

import {
  FETCH_WELLBEING_LIST_ASYNC,
  FETCH_WELLBEING_LIST_SUCCESS,
  FETCH_WELLBEING_LIST_ERROR,
  OPEN_WELLBEING_POPUP,
  CLOSE_WELLBEING_POPUP,
  type TFilteredNotificatonList,
  type TWellbeingRequestActionTypes,
} from "../constants/wellbeingDashboard";


export type TWellbeingDashboardStore = {
  wellbeingList: TFilteredNotificatonList;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  popupItemId: number;
}

const initialStore: TWellbeingDashboardStore = {
  wellbeingList: {},
  loading: true,
  fetchError: false,
  popupOpened: false,
  popupItemId: -1,
};

export const wellbeingReducer = (
  state: TWellbeingDashboardStore = initialStore,
  action: TWellbeingRequestActionTypes,
): TWellbeingDashboardStore => {
  switch (action.type) {
    case OPEN_WELLBEING_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItemId: action.payload.id,
      };
    case CLOSE_WELLBEING_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItemId: -1,
      };
    case FETCH_WELLBEING_LIST_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WELLBEING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wellbeingList: action.payload.wellbeingList,
        fetchError: false,
      };
    case FETCH_WELLBEING_LIST_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return state;
  }
};
