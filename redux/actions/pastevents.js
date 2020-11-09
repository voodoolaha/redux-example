// @flow

import {
  FETCH_EVENTS_PAST,
  type TFetchPastEventsAction,
  OPEN_EVENT_PAST_POPUP,
  CLOSE_EVENT_PAST_POPUP,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/pastevents";

import { type TEvent } from "../../interface/event";

export const fetchPastEventsAsync = (): TFetchPastEventsAction => ({ type: FETCH_EVENTS_PAST });

export const openPopup = (event?: TEvent): TOpenPopupAction => ({
  type: OPEN_EVENT_PAST_POPUP,
  payload: { event: event || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_EVENT_PAST_POPUP,
});
