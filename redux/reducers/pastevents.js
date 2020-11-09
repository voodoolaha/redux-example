// @flow

import { type TEvent } from "../../interface/event";

import {
  FETCH_EVENTS_PAST,
  FETCH_EVENTS_PAST_SUCCEEDED,
  FETCH_EVENTS_PAST_FAILED,
  type TPastEventActionTypes,
  OPEN_EVENT_PAST_POPUP,
  CLOSE_EVENT_PAST_POPUP,
} from "../constants/pastevents";

export type TPastEventStore = {
  pastevents: Array<TEvent>;
  loadingPast: boolean;
  fetchErrorPast: boolean;
  popupOpened: boolean;
  pastevent: ?TEvent;
  popupItem: ?TEvent;
}

const initialState: TPastEventStore = {
  pastevents: [],
  loadingPast: false,
  fetchErrorPast: false,
  popupOpened: false,
  pastevent: null,
  popupItem: null,
};

export const pastEventReducer = (
  state: TPastEventStore = initialState,
  action: TPastEventActionTypes,
) => {
  switch (action.type) {
    case OPEN_EVENT_PAST_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.event,
      };
    case CLOSE_EVENT_PAST_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_EVENTS_PAST:
      return {
        ...state,
        loadingPast: true,
      };
    case FETCH_EVENTS_PAST_SUCCEEDED:
      return {
        ...state,
        loadingPast: false,
        fetchErrorPast: false,
        pastevents: action.payload.pastevents,
      };
    case FETCH_EVENTS_PAST_FAILED:
      return {
        ...state,
        loadingPast: false,
        fetchErrorPast: true,
      };
    default:
      return { ...state };
  }
};
