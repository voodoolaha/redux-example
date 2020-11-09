import { type Reducer, combineReducers, AnyAction } from "redux";

import { firebaseReducer as firebase } from "react-redux-firebase";
import { firestoreReducer as firestore } from "redux-firestore";

import { userReducer as user } from "./reducers/user";
import { eventReducer as events } from "./reducers/events";
import { pastEventReducer as pastevents } from "./reducers/pastevents";
import { attendeesReducer as attendees } from "./reducers/attendees";
import { waitlistReducer as waitlist } from "./reducers/waitlist";
import { adminReducer as admin } from "./reducers/admin";
import { notificationReducer as notification } from "./reducers/notification";
import { siteReducer as site } from "./reducers/site";
import { wellbeingReducer as wellbeingDashboard } from "./reducers/wellbeingDashboard";
import { wellbeingContentReducer as wellbeingContent } from "./reducers/wellbeingContent";
import { wellbeingResourcesReducer as wellbeingResources } from "./reducers/wellbeingResources";
import { residentReducer as resident } from "./reducers/resident";
import { adminDetailsReducer as adminDetails } from "./reducers/adminDetails";
import { maintenanceReducer as maintenance } from "./reducers/maintenance";
import { IssueReducer as maintenanceIssue } from "./reducers/issue";
import { SLAReducer as maintenanceSLA } from "./reducers/sla";
import { reportReducer as report } from "./reducers/report";
import { deliveryReducer as delivery } from "./reducers/deliveries";
import { chatReducer as chat } from "./reducers/chat";
import { alertReducer as alert } from "./reducers/alert";
import { firebaseReduxReducer as firebaseRedux } from "./reducers/firebase";

import { type TApplicationState } from "./types";

export const reducers: Reducer<TApplicationState, AnyAction> = combineReducers({
  firebase,
  firestore,
  firebaseRedux,
  user,
  admin,
  events,
  pastevents,
  attendees,
  waitlist,
  notification,
  site,
  adminDetails,
  maintenance,
  maintenanceIssue,
  maintenanceSLA,
  report,
  delivery,
  wellbeingDashboard,
  wellbeingContent,
  wellbeingResources,
  resident,
  chat,
  alert,
});
