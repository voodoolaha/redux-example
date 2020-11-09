// @flow

import {
  UPDATE_FIREBASE_TOKEN_SUCCESS,
  UPDATE_FIREBASE_TOKEN_ERROR,
  type TFirebaseActionTypes,
} from "../constants/firebase";


export type TFirebaseReduxStore = {
  updateFailureCount: number;
}

const initialState: TFirebaseReduxStore = {
  updateFailureCount: 0,
};

export const firebaseReduxReducer = (
  state: TFirebaseReduxStore = initialState,
  action: TFirebaseActionTypes,
): TFirebaseReduxStore => {
  switch (action.type) {
    case UPDATE_FIREBASE_TOKEN_SUCCESS:
      return {
        ...state,
        updateFailureCount: 0,
      };
    case UPDATE_FIREBASE_TOKEN_ERROR:
      return {
        ...state,
        updateFailureCount: state.updateFailureCount + 1,
      };
    default:
      return state;
  }
};
