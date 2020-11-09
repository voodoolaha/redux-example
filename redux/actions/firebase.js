// @flow


import { FIREBASE_LOGOUT, type TFirebaseLogoutAction } from "../constants/firebase";

export const firebaseLogoutAsync = (): TFirebaseLogoutAction => ({
  type: FIREBASE_LOGOUT,
});
