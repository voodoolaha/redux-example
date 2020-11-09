import {
  FETCH_WAITLIST,
  FETCH_WAITLIST_SUCCEEDED,
  FETCH_WAITLIST_FAILED,
} from "../constants/waitlist";

const initialState = {
  waitlist: [],
  loading: true,
  error: false,
};

export const waitlistReducer = (state = initialState, action: {type: string, payload: any}) => {
  switch (action.type) {
    case FETCH_WAITLIST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WAITLIST_SUCCEEDED:
      return {
        ...state,
        loading: false,
        waitlist: action.payload.waitlist,
      };
    case FETCH_WAITLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
