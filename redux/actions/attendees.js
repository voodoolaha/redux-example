import {
  FETCH_ATTENDEES,
} from "../constants/attendees";

export const fetchAttendeesAsync = (id: number) => ({
  type: FETCH_ATTENDEES,
  payload: { id },
});
