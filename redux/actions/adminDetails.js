// @flow

import {
  FETCH_ADMIN_DETAILS_ASYNC,
  type TAdminDetailsActionTypes,
} from "../constants/adminDetails";


export const getAdminDetailsAction = (id: string): TAdminDetailsActionTypes => ({
  type: FETCH_ADMIN_DETAILS_ASYNC,
  payload: { id },
});
