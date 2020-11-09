// @flow

import { type TResident } from "../../interface/resident";
import {
  FETCH_RESIDENT_LIST_ASYNC,
  FETCH_RESIDENT_LIST_ERROR,
  FETCH_RESIDENT_LIST_SUCCESS,
  FETCH_RESIDENT_ASYNC,
  FETCH_RESIDENT_SUCCESS,
  FETCH_RESIDENT_ERROR,
  UPLOAD_RESIDENT_LIST,
  RESIDENT_LIST_UPLOAD_FINISHED,
  type TResidentActionTypes,
} from "../constants/resident";

export type TResidentStore = {
  residents: Array<TResident>,
  resident: ?TResident,
  loading: boolean;
  fetchError: boolean;
  uploading: boolean;
};

const initialState: TResidentStore = {
  residents: [],
  resident: null,
  loading: false,
  fetchError: false,
  uploading: false,
};

export const residentReducer = (
  state: TResidentStore = initialState,
  action: TResidentActionTypes,
): TResidentStore => {
  switch (action.type) {
    case FETCH_RESIDENT_LIST_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESIDENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        residents: action.payload.residents,
      };
    case FETCH_RESIDENT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    case FETCH_RESIDENT_ASYNC:
      return {
        ...state,
        loading: true,
        fetchError: false,
      };
    case FETCH_RESIDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        resident: action.payload.resident,
      };
    case FETCH_RESIDENT_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
        resident: null,
      };
    case UPLOAD_RESIDENT_LIST:
      return {
        ...state,
        uploading: true,
      };
    case RESIDENT_LIST_UPLOAD_FINISHED:
      return {
        ...state,
        uploading: false,
      };
    default:
      return state;
  }
};
