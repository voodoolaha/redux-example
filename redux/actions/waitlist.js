import {
  FETCH_WAITLIST,
} from "../constants/waitlist";

export const fetchWaitlistAsync = (id: number) => ({
  type: FETCH_WAITLIST,
  payload: { id },
});
