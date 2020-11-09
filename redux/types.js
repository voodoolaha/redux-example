// @flow

import { type TUserStore } from "./reducers/user";
import { type TAdminStore } from "./reducers/admin";
import { type TEventStore } from "./reducers/events";
import { type TPastEventStore } from "./reducers/pastevents";
import { type TNotificationStore } from "./reducers/notification";
import { type TSiteStorage } from "./reducers/site";
import { type TAdminDetailsStore } from "./reducers/adminDetails";
import { type TMaintenanceStore } from "./reducers/maintenance";
import { type TIssueStore } from "./reducers/issue";
import { type TSLAStore } from "./reducers/sla";
import { type TDeliveryStore } from "./reducers/deliveries";
import { type TWellbeingDashboardStore } from "./reducers/wellbeingDashboard";
import { type TWellbeingContentStore } from "./reducers/wellbeingContent";
import { type TWellbeingResourceStore } from "./reducers/wellbeingResources";
import { type TResidentStore } from "./reducers/resident";
import { type TChatStore } from "./reducers/chat";
import { type TAlertStore } from "./reducers/alert";
import { type TFirebaseReduxStore } from "./reducers/firebase";


export type TApplicationState = {
  firebase: Object;
  firestore: Object;
  firebaseRedux: TFirebaseReduxStore;
  user :TUserStore;
  admin: TAdminStore;
  events: TEventStore;
  pastevents: TPastEventStore;
  notification: TNotificationStore;
  site: TSiteStorage;
  adminDetails: TAdminDetailsStore;
  maintenance: TMaintenanceStore;
  maintenanceIssue: TIssueStore;
  maintenanceSLA: TSLAStore;
  delivery: TDeliveryStore;
  wellbeingDashboard: TWellbeingDashboardStore;
  wellbeingContent: TWellbeingContentStore;
  wellbeingResources: TWellbeingResourceStore;
  resident: TResidentStore;
  chat: TChatStore;
  alert: TAlertStore;
}
