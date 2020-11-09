// @flow

import { type TEvent } from "../../interface/event";

import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCEEDED,
  FETCH_EVENTS_FAILED,
  GET_EVENT_DETAILS,
  GET_EVENT_DETAILS_SUCCEEDED,
  GET_EVENT_DETAILS_FAILED,
  type TEventActionTypes,
  OPEN_EVENT_POPUP,
  CLOSE_EVENT_POPUP,
} from "../constants/events";

export type TEventStore = {
  events: Array<TEvent>;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  event: ?TEvent;
  popupItem: ?TEvent;
}

const initialState: TEventStore = {
  events: [],
  loading: false,
  fetchError: false,
  popupOpened: false,
  event: null,
  popupItem: null,
};

export const eventReducer = (
  state: TEventStore = initialState,
  action: TEventActionTypes,
) => {
  switch (action.type) {
    case OPEN_EVENT_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.event,
      };
    case CLOSE_EVENT_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        fetchError: false,
        events: action.payload.events,
      };
    case FETCH_EVENTS_FAILED:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    case GET_EVENT_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case GET_EVENT_DETAILS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        fetchError: false,
        event: action.payload.event,
      };
    case GET_EVENT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return { ...state };
  }
};
