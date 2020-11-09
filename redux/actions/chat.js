// @flow

import {
  FETCH_ROOM_MEMBERS_ASYNC,
  SEND_CHAT_MESSAGE_ASYNC,
  CHANGE_TYPING_STATUS_ASYNC,
  DELETE_ROOM_ASYNC,
  CREATE_MAINTENANCE_CHAT_ASYNC,
  type TFetchRoomMembersAction,
  type TSendChatMessageAction,
  type TChangeTypingStatusAction,
  type TDeleteRoomAction,
  type TCreateMaintenanceChatAction,
} from "../constants/chat";


export const fetchRoomMembersAsync = (
  room_id: string,
  chat_type: string,
): TFetchRoomMembersAction => ({
  type: FETCH_ROOM_MEMBERS_ASYNC,
  payload: { room_id, chat_type },
});


export const sendMessageAsync = (message: string, room_id: string): TSendChatMessageAction => ({
  type: SEND_CHAT_MESSAGE_ASYNC,
  payload: {
    room_id,
    message,
  },
});


/**
 * Action to change status of typing of the admin for specific room
 * @param {string} room_id Id of the room in firebase
 * @param {string} chat_type Type of chat that can be 'maintenance' or 'wellbeing'
 * @param {boolean} is_typing Typing status
 * @param {boolean} is_admin Type of user. In case of admin panel its always 'admin'
 */
export const changeTypingStatusAsync = (
  room_id: string,
  chat_type: string,
  is_typing: boolean,
  is_admin: boolean = true,
): TChangeTypingStatusAction => ({
  type: CHANGE_TYPING_STATUS_ASYNC,
  payload: {
    room_id,
    chat_type,
    is_admin,
    is_typing,
  },
});


export const deleteRoomAsync = (room_id: string): TDeleteRoomAction => ({
  type: DELETE_ROOM_ASYNC,
  payload: { room_id },
});


export const createMaintenanceChatAsync = (
  id: number,
  history: any,
): TCreateMaintenanceChatAction => ({
  type: CREATE_MAINTENANCE_CHAT_ASYNC,
  payload: { id, history },
});
