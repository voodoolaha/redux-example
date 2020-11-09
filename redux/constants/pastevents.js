// @flow

import { type TEvent } from "../../interface/event";

export const FETCH_EVENTS_PAST: "FETCH_EVENTS_PAST" = "FETCH_EVENTS_PAST";
export const FETCH_EVENTS_PAST_SUCCEEDED: "FETCH_EVENTS_PAST_SUCCEEDED" = "FETCH_EVENTS_PAST_SUCCEEDED";
export const FETCH_EVENTS_PAST_FAILED: "FETCH_EVENTS_PAST_FAILED" = "FETCH_EVENTS_PAST_FAILED";

export const OPEN_EVENT_PAST_POPUP: "OPEN_EVENT_PAST_POPUP" = "OPEN_EVENT_PAST_POPUP";
export const CLOSE_EVENT_PAST_POPUP: "CLOSE_EVENT_PAST_POPUP" = "CLOSE_EVENT_PAST_POPUP";

// client initiated actions
export type TFetchPastEventsAction = {
  type: typeof FETCH_EVENTS_PAST,
}

// saga initiated actions
export type TFetchPastEventsSuccessAction = {
  type: typeof FETCH_EVENTS_PAST_SUCCEEDED,
  payload: {
    pastevents: Array<TEvent>
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_EVENT_PAST_POPUP,
  payload: {
    event: ?TEvent,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_EVENT_PAST_POPUP,
}

export type TFetchPastEventsErrorAction = {
type: typeof FETCH_EVENTS_PAST_FAILED,
}

export type TPastEventActionTypes = TFetchPastEventsAction
  | TFetchPastEventsSuccessAction
  | TFetchPastEventsErrorAction
  | TOpenPopupAction
  | TClosePopupAction
