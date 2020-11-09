// @flow

import {
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  GET_EVENT_DETAILS,
  OPEN_EVENT_POPUP,
  CLOSE_EVENT_POPUP,
  type TFetchEventsAction,
  type TFetchEventAction,
  type TCreateEventAction,
  type TEditEventAction,
  type TDeleteEventAction,
  type TOpenPopupAction,
  type TClosePopupAction,

} from "../constants/events";
import { type TEvent } from "../../interface/event";

export const fetchEventsAsync = (): TFetchEventsAction => ({ type: FETCH_EVENTS });

export const createEventAsync = (event: FormData): TCreateEventAction => ({
  type: CREATE_EVENT,
  payload: { event },
});

export const updateEventAsync = (event: FormData): TEditEventAction => ({
  type: UPDATE_EVENT,
  payload: { event },
});

export const deleteEventAsync = (id: number): TDeleteEventAction => ({
  type: DELETE_EVENT,
  payload: { id },
});

export const getDetailsEventAsync = (id: number): TFetchEventAction => ({
  type: GET_EVENT_DETAILS,
  payload: { id },
});

export const openPopup = (event?: TEvent): TOpenPopupAction => ({
  type: OPEN_EVENT_POPUP,
  payload: { event: event || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_EVENT_POPUP,
});
