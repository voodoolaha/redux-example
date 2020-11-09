// @flow

import { type TUploadableResident } from "../../pages/ResidentManagement/types";
import {
  FETCH_RESIDENT_LIST_ASYNC,
  FETCH_RESIDENT_ASYNC,
  UPLOAD_RESIDENT_LIST,
  type TFetchResidentListAction,
  type TFetchResidentAction,
  type TUploadResidentListAction,
} from "../constants/resident";


export const fetchResidentListAsync = (): TFetchResidentListAction => ({
  type: FETCH_RESIDENT_LIST_ASYNC,
});

export const fetchResidentAsync = (id: number): TFetchResidentAction => ({
  type: FETCH_RESIDENT_ASYNC,
  payload: { id },
});

export const uploadResidentListAsync = (
  residents: Array<TUploadableResident>,
): TUploadResidentListAction => ({
  type: UPLOAD_RESIDENT_LIST,
  payload: { residents },
});
