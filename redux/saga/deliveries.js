// @flow

import { type Saga } from "redux-saga";
import {
  takeEvery, put, call, all, take,
} from "redux-saga/effects";
import axios from "axios";

import { makeHeader } from "../helpers/makeHeader";
import api from "../../config/api";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";
import {
  FETCH_DELIVERY_LIST_ASYNC,
  FETCH_DELIVERY_LIST_SUCCESS,
  FETCH_DELIVERY_LIST_ERROR,
  FETCH_DELIVERY_ASYNC,
  FETCH_DELIVERY_SUCCESS,
  FETCH_DELIVERY_ERROR,
  CREATE_DELIVERY_ASYNC,
  EDIT_DELIVERY_ASYNC,
  CHANGE_PARCEL_STATUS,
  CLOSE_DELIVERY_POPUP,
  DELETE_DELIVERY_ASYNC,
  type TDeleteDeliveryAction,
  type TFetchDeliveryListErrorAction,
  type TFetchDeliveryListSuccessAction,
  type TCreateDeliveryAction,
  type TEditDeliveryAction,
  type TChangeParcelStatusAction,
  type TClosePopupAction,
  type TFetchDeliveryAction,
  type TFetchDeliverySuccessAction,
  type TFetchDeliveryErrorAction,
} from "../constants/deliveries";


function* fetchDeliveriesListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}${api.PARCEL}/list`, makeHeader()),
    );

    yield put<TFetchDeliveryListSuccessAction>({
      type: FETCH_DELIVERY_LIST_SUCCESS,
      payload: { deliveries: response.data },
    });
  } catch (e) {
    yield put<TFetchDeliveryListErrorAction>({ type: FETCH_DELIVERY_LIST_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* fetchDeliveriesListWatcher(): Saga<void> {
  yield takeEvery(FETCH_DELIVERY_LIST_ASYNC, fetchDeliveriesListAsync);
}


function* fetchDeliveryAsync(action: TFetchDeliveryAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}${api.PARCEL}?id=${action.payload.id}`, makeHeader()),
    );

    yield put<TFetchDeliverySuccessAction>({
      type: FETCH_DELIVERY_SUCCESS,
      payload: {
        delivery: response.data,
      },
    });
  } catch (e) {
    yield put<TFetchDeliveryErrorAction>({ type: FETCH_DELIVERY_ERROR });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* fetchDeliveryWatcher(): Saga<void> {
  yield takeEvery(FETCH_DELIVERY_ASYNC, fetchDeliveryAsync);
}

function* deleteDeliveryAsync(action: TDeleteDeliveryAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}${api.PARCEL}?id=${action.payload.id}`, makeHeader()),
    );

    yield call(fetchDeliveriesListAsync);
    yield call(showAlert, {
      content: "Delivery has been deleted",
      type: alertTypes.SUCCESS,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* createDeliveryAsync(action: TCreateDeliveryAction): Saga<void> {
  try {
    yield call(
      () => axios.post(`${api.BASE_URL}${api.PARCEL}`, action.payload, makeHeader()),
    );

    yield call(fetchDeliveriesListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_DELIVERY_POPUP });
    yield call(showAlert, {
      content: "Delivery has been created",
      type: alertTypes.SUCCESS,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* createDeliveryWatcher(): Saga<void> {
  while (true) {
    const action: TCreateDeliveryAction = yield take(CREATE_DELIVERY_ASYNC);
    yield call(createDeliveryAsync, action);
  }
}


function* deleteDeliveryWatcher(): Saga<void> {
  while (true) {
    const action: TDeleteDeliveryAction = yield take(DELETE_DELIVERY_ASYNC);
    yield call(deleteDeliveryAsync, action);
  }
}

function* editDeliveryAsync(action: TEditDeliveryAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.PARCEL}/update_by_admin`, action.payload, makeHeader()),
    );

    yield call(fetchDeliveriesListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_DELIVERY_POPUP });
    yield call(showAlert, {
      content: "Delivery has been updated",
      type: alertTypes.SUCCESS,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* editDeliveryWatcher(): Saga<void> {
  while (true) {
    const action: TEditDeliveryAction = yield take(EDIT_DELIVERY_ASYNC);
    yield call(editDeliveryAsync, action);
  }
}


function* changeParcelStatusAsync(action: TChangeParcelStatusAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}${api.PARCEL}/by_admin`, {
        parcel_id: action.payload.id,
        new_status: action.payload.status,
      }, makeHeader()),
    );

    yield call(fetchDeliveriesListAsync);

    if (action.payload.detailsPage) {
      yield put<TFetchDeliveryAction>({
        type: FETCH_DELIVERY_ASYNC,
        payload: { id: action.payload.id },
      });
    }

    yield put<TClosePopupAction>({ type: CLOSE_DELIVERY_POPUP });
    yield call(showAlert, {
      content: "Delivery status has been updated",
      type: alertTypes.SUCCESS,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 3000,
    });
  }
}

function* changeParcelStatusWathcer(): Saga<void> {
  while (true) {
    const action: TChangeParcelStatusAction = yield take(CHANGE_PARCEL_STATUS);
    yield call(changeParcelStatusAsync, action);
  }
}

export function* rootDeliverySaga(): Saga<void> {
  yield all([
    call(fetchDeliveriesListWatcher),
    call(fetchDeliveryWatcher),
    call(createDeliveryWatcher),
    call(deleteDeliveryWatcher),
    call(editDeliveryWatcher),
    call(changeParcelStatusWathcer),
  ]);
}
