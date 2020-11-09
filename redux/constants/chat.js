// @flow

import { type TChatMember } from "../../interface/chat/member";


export const FETCH_ROOM_MEMBERS_ASYNC: "FETCH_ROOM_MEMBERS_ASYNC" = "FETCH_ROOM_MEMBERS_ASYNC";
export const FETCH_ROOM_MEMBERS_SUCCESS: "FETCH_ROOM_MEMBERS_SUCCESS" = "FETCH_ROOM_MEMBERS_SUCCESS";
export const FETCH_ROOM_MEMBERS_ERROR: "FETCH_ROOM_MEMBERS_ERROR" = "FETCH_ROOM_MEMBERS_ERROR";

export const SEND_CHAT_MESSAGE_ASYNC: "SEND_CHAT_MESSAGE_ASYNC" = "SEND_CHAT_MESSAGE_ASYNC";

export const CHANGE_TYPING_STATUS_ASYNC: "CHANGE_TYPING_STATUS_ASYNC" = "CHANGE_TYPING_STATUS_ASYNC";

export const DELETE_ROOM_ASYNC: "DELETE_ROOM_ASYNC" = "DELETE_ROOM_ASYNC";

export const CREATE_MAINTENANCE_CHAT_ASYNC: "CREATE_MAINTENANCE_CHAT_ASYNC" = "CREATE_MAINTENANCE_CHAT_ASYNC";

export type TFetchRoomMembersAction = {
  type: typeof FETCH_ROOM_MEMBERS_ASYNC,
  payload: {
    room_id: string,
    chat_type: string,
  }
}

export type TFetchRoomMembersSuccessAction = {
  type: typeof FETCH_ROOM_MEMBERS_SUCCESS,
  payload: {
    members: Array<TChatMember>,
  }
}

export type TFetchRoomMembersErrorAction = {
  type: typeof FETCH_ROOM_MEMBERS_ERROR,
}

export type TSendChatMessageAction = {
  type: typeof SEND_CHAT_MESSAGE_ASYNC,
  payload: {
    message: string,
    room_id: string,
  }
}

export type TChangeTypingStatusAction = {
  type: typeof CHANGE_TYPING_STATUS_ASYNC,
  payload: {
    room_id: string,
    chat_type: string,
    is_admin: boolean,
    is_typing: boolean,
  }
}

export type TDeleteRoomAction = {
  type: typeof DELETE_ROOM_ASYNC,
  payload: {
    room_id: string,
  }
}

export type TCreateMaintenanceChatAction = {
  type: typeof CREATE_MAINTENANCE_CHAT_ASYNC,
  payload: {
    id: number,
    // TODO: find out how to work with BrowserHistory type
    history: any,
  }
}


export type TMaintenanceChatActionTypes = TFetchRoomMembersAction
  | TFetchRoomMembersSuccessAction
  | TFetchRoomMembersErrorAction
  | TSendChatMessageAction
  | TChangeTypingStatusAction
  | TDeleteRoomAction
  | TCreateMaintenanceChatAction
