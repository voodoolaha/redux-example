// @flow

import { type TChatMember } from "../../interface/chat/member";

import {
  FETCH_ROOM_MEMBERS_ASYNC,
  FETCH_ROOM_MEMBERS_SUCCESS,
  FETCH_ROOM_MEMBERS_ERROR,
  type TMaintenanceChatActionTypes,
} from "../constants/chat";


export type TChatStore = {
  members: {
    data: Array<TChatMember>,
    loading: boolean,
    fetchError: boolean,
  }
}

const initialState: TChatStore = {
  members: {
    data: [],
    loading: false,
    fetchError: false,
  },
};


export const chatReducer = (
  state: TChatStore = initialState,
  action: TMaintenanceChatActionTypes,
): TChatStore => {
  switch (action.type) {
    case FETCH_ROOM_MEMBERS_ASYNC:
      return {
        ...state,
        members: {
          ...state.members,
          fetchError: false,
          loading: true,
        },
      };
    case FETCH_ROOM_MEMBERS_SUCCESS:
      return {
        ...state,
        members: {
          ...state.members,
          fetchError: false,
          loading: false,
          data: action.payload.members,
        },
      };
    case FETCH_ROOM_MEMBERS_ERROR:
      return {
        ...state,
        members: {
          ...state.members,
          fetchError: true,
          loading: false,
          data: [],
        },
      };
    default:
      return state;
  }
};
