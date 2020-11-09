// @flow

import { type TEvent } from "../../interface/event";

export const FETCH_EVENTS: "FETCH_EVENTS" = "FETCH_EVENTS";
export const FETCH_EVENTS_SUCCEEDED: "FETCH_EVENTS_SUCCEEDED" = "FETCH_EVENTS_SUCCEEDED";
export const FETCH_EVENTS_FAILED: "FETCH_EVENTS_FAILED" = "FETCH_EVENTS_FAILED";

export const CREATE_EVENT: "CREATE_EVENT" = "CREATE_EVENT";
export const CREATE_EVENT_SUCCEEDED: "CREATE_EVENTS_SUCCEEDED" = "CREATE_EVENTS_SUCCEEDED";
export const CREATE_EVENT_FAILED: "CREATE_EVENTS_FAILED" = "CREATE_EVENTS_FAILED";

export const UPDATE_EVENT: "UPDATE_EVENT" = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCEEDED: "UPDATE_EVENTS_SUCCEEDED" = "UPDATE_EVENTS_SUCCEEDED";
export const UPDATE_EVENT_FAILED: "UPDATE_EVENTS_FAILED" = "UPDATE_EVENTS_FAILED";

export const DELETE_EVENT: "DELETE_EVENT" = "DELETE_EVENT";
export const DELETE_EVENT_SUCCEEDED: "DELETE_EVENTS_SUCCEEDED" = "DELETE_EVENTS_SUCCEEDED";
export const DELETE_EVENT_FAILED: "DELETE_EVENTS_FAILED" = "DELETE_EVENTS_FAILED";

export const GET_EVENT_DETAILS: "GET_EVENT_DETAILS" = "GET_EVENT_DETAILS";
export const GET_EVENT_DETAILS_SUCCEEDED: "GET_EVENT_DETAILS_SUCCEEDED" = "GET_EVENT_DETAILS_SUCCEEDED";
export const GET_EVENT_DETAILS_FAILED: "GET_EVENT_DETAILS_FAILED" = "GET_EVENT_DETAILS_FAILED";

export const OPEN_EVENT_POPUP: "OPEN_EVENT_POPUP" = "OPEN_EVENT_POPUP";
export const CLOSE_EVENT_POPUP: "CLOSE_EVENT_POPUP" = "CLOSE_EVENT_POPUP";

// client initiated actions
export type TFetchEventsAction = {
  type: typeof FETCH_EVENTS,
}

export type TFetchEventAction = {
  type: typeof GET_EVENT_DETAILS,
  payload: {
    id: number,
  }
}

export type TCreateEventAction = {
  type: typeof CREATE_EVENT,
  payload: {
    event: FormData,
  }
}

export type TEditEventAction = {
  type: typeof UPDATE_EVENT,
  payload: {
    event: FormData,
  }
}

export type TDeleteEventAction = {
  type: typeof DELETE_EVENT,
  payload: {
    id: number,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_EVENT_POPUP,
  payload: {
    event: ?TEvent,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_EVENT_POPUP,
}

// saga initiated actions
export type TFetchEventsSuccessAction = {
  type: typeof FETCH_EVENTS_SUCCEEDED,
  payload: {
    events: Array<TEvent>
  }
}

export type TFetchEventsErrorAction = {
type: typeof FETCH_EVENTS_FAILED,
}


export type TFetchEventSuccessAction = {
type: typeof GET_EVENT_DETAILS_SUCCEEDED,
payload: {
  event: TEvent,
}
}

export type TFetchEventErrorAction = {
type: typeof GET_EVENT_DETAILS_FAILED,
}

export type TEventActionTypes = TFetchEventsAction
  | TFetchEventAction
  | TCreateEventAction
  | TEditEventAction
  | TDeleteEventAction
  | TFetchEventsSuccessAction
  | TFetchEventsErrorAction
  | TFetchEventSuccessAction
  | TFetchEventErrorAction
  | TOpenPopupAction
  | TClosePopupAction
