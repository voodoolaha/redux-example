// @flow

import { type Saga } from "redux-saga";
import {
  takeEvery, put, call, all, take, throttle,
} from "redux-saga/effects";
import axios from "axios";

import { makeHeader } from "../helpers/makeHeader";
import api from "../../config/api";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_ROOM_MEMBERS_ASYNC,
  FETCH_ROOM_MEMBERS_SUCCESS,
  FETCH_ROOM_MEMBERS_ERROR,
  SEND_CHAT_MESSAGE_ASYNC,
  CHANGE_TYPING_STATUS_ASYNC,
  DELETE_ROOM_ASYNC,
  CREATE_MAINTENANCE_CHAT_ASYNC,
  type TFetchRoomMembersAction,
  type TFetchRoomMembersSuccessAction,
  type TFetchRoomMembersErrorAction,
  type TSendChatMessageAction,
  type TChangeTypingStatusAction,
  type TDeleteRoomAction,
  type TCreateMaintenanceChatAction,
} from "../constants/chat";


function* fetchRoomMembersAsync(action: TFetchRoomMembersAction): Saga<void> {
  const { chat_type, room_id } = action.payload;

  const url = chat_type === "maintenance"
    ? `${api.BASE_URL}/chat/members?room_id=${room_id}`
    : `${api.BASE_URL}/chat/wellbeing/members?room_id=${room_id}`;

  try {
    const response = yield call(() => axios.get(url, makeHeader()));
    yield put<TFetchRoomMembersSuccessAction>({
      type: FETCH_ROOM_MEMBERS_SUCCESS,
      payload: {
        members: chat_type === "maintenance" ? response.data : response.data.admins,
      },
    });
  } catch (e) {
    yield put<TFetchRoomMembersErrorAction>({ type: FETCH_ROOM_MEMBERS_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* fetchRoomMembersWatcher(): Saga<void> {
  yield takeEvery(FETCH_ROOM_MEMBERS_ASYNC, fetchRoomMembersAsync);
}


function* sendChatMessageAsync(action: TSendChatMessageAction): Saga<void> {
  try {
    yield call(() => axios.post(`${api.BASE_URL}/chat/admin_message`, { ...action.payload }, makeHeader()));
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* sendChatMessageWatcher(): Saga<void> {
  while (true) {
    const action: TSendChatMessageAction = yield take(SEND_CHAT_MESSAGE_ASYNC);
    yield call(sendChatMessageAsync, action);
  }
}


function* changeTypingStatusAsync(action: TChangeTypingStatusAction): Saga<void> {
  const { chat_type, ...body } = action.payload;
  const url = chat_type === "maintenance"
    ? `${api.BASE_URL}/chat/typing`
    : `${api.BASE_URL}/chat/wellbeing/typing`;

  try {
    yield call(() => axios.patch(url, { ...body }, makeHeader()));
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* changeTypingStatusWatcher(): Saga<void> {
  yield throttle(340, CHANGE_TYPING_STATUS_ASYNC, changeTypingStatusAsync);
}


function* deleteRoomAsync(action: TDeleteRoomAction): Saga<void> {
  try {
    yield call(() => axios.delete(`${api.BASE_URL}/chat?id=${action.payload.room_id}`, makeHeader()));
    yield call(showAlert, {
      content: "Chat room has been deleted",
      type: alertTypes.SUCCESS,
      duration: 2500,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* deleteRoomWatcher(): Saga<void> {
  while (true) {
    const action: TDeleteRoomAction = yield take(DELETE_ROOM_ASYNC);
    yield call(deleteRoomAsync, action);
  }
}


function* createMaintenanceChatAsync(action: TCreateMaintenanceChatAction): Saga<void> {
  try {
    const { id, history } = action.payload;

    const response = yield call(
      () => axios.post(`${api.BASE_URL}/chat/room_by_admin?id=${id}`, {}, makeHeader()),
    );

    if (response.data) {
      history.push(`/panel/chat/maintenance/${response.data}`);

      yield call(showAlert, {
        content: "Redirected to the room",
        type: alertTypes.INFO,
        duration: 2500,
      });
    } else {
      yield call(showAlert, {
        content: "Seems like room id wasn't returned from the server. The room most likely was created",
        type: alertTypes.WARNING,
        duration: 3000,
      });
    }
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* createMaintenanceChatWatcher(): Saga<void> {
  while (true) {
    const action: TCreateMaintenanceChatAction = yield take(CREATE_MAINTENANCE_CHAT_ASYNC);
    yield call(createMaintenanceChatAsync, action);
  }
}


export function* rootChatSaga(): Saga<void> {
  yield all([
    call(fetchRoomMembersWatcher),
    call(sendChatMessageWatcher),
    call(changeTypingStatusWatcher),
    call(deleteRoomWatcher),
    call(createMaintenanceChatWatcher),
  ]);
}
