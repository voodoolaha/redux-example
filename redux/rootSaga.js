// @flow

import { type Saga } from "redux-saga";
import { all, call } from "redux-saga/effects";

import { rootFirebaseSaga } from "./saga/firebase";
import { rootUserSaga } from "./saga/user";
import { rootEventSaga } from "./saga/events";
import { rootPastEventSaga } from "./saga/pastevents";
import { rootAttendeesSaga } from "./saga/attendees";
import { rootWaitlistSaga } from "./saga/waitlist";
import { rootAdminSaga } from "./saga/admin";
import { rootNotificationSaga } from "./saga/notification";
import { rootSiteSaga } from "./saga/site";
import { rootAdminDetailsSaga } from "./saga/adminDetails";
import { rootMaintenanceSaga } from "./saga/maintenance";
import { rootMaintenanceIssueSaga } from "./saga/maintenanceIssue";
import { rootReportSaga } from "./saga/report";
import { rootDeliverySaga } from "./saga/deliveries";
import { rootWellbeingDashboardSaga } from "./saga/wellbeingDashboard";
import { rootWellbeingContentSaga } from "./saga/wellbeingContent";
import { rootWellbeingResourcesSaga } from "./saga/wellbeingResources";
import { rootResidentSaga } from "./saga/resident";
import { rootAlertSaga } from "./saga/alert";
import { rootChatSaga } from "./saga/chat";

export function* rootSaga(): Saga<void> {
  yield all([
    call(rootFirebaseSaga),
    call(rootUserSaga),
    call(rootAdminSaga),
    call(rootEventSaga),
    call(rootPastEventSaga),
    call(rootAttendeesSaga),
    call(rootWaitlistSaga),
    call(rootNotificationSaga),
    call(rootAdminDetailsSaga),
    call(rootSiteSaga),
    call(rootMaintenanceSaga),
    call(rootMaintenanceIssueSaga),
    call(rootReportSaga),
    call(rootDeliverySaga),
    call(rootWellbeingDashboardSaga),
    call(rootWellbeingContentSaga),
    call(rootWellbeingResourcesSaga),
    call(rootResidentSaga),
    call(rootAlertSaga),
    call(rootChatSaga),
  ]);
}
