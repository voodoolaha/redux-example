// @flow

import {
  SHOW_USER_ERROR,
  SHOW_USER_MESSAGE,
  type TShowUserErrorAction,
  type TShowUserMessageAction,
} from "../constants/alert";

export const showUserError = (content: string): TShowUserErrorAction => ({
  type: SHOW_USER_ERROR,
  payload: { content },
});

export const showUserMessage = (
  content: string,
  type: string,
  duration: number,
): TShowUserMessageAction => ({
  type: SHOW_USER_MESSAGE,
  payload: {
    content,
    type,
    duration,
  },
});
