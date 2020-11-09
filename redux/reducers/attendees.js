import {
  FETCH_ATTENDEES,
  FETCH_ATTENDEES_SUCCEEDED,
  FETCH_ATTENDEES_FAILED,
} from "../constants/attendees";

const initialState = {
  attendees: [],
  loading: true,
  error: false,
};

export const attendeesReducer = (state = initialState, action: {type: string, payload: any}) => {
  switch (action.type) {
    case FETCH_ATTENDEES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ATTENDEES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        attendees: action.payload.attendees,
      };
    case FETCH_ATTENDEES_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
