import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createFirestoreInstance } from "redux-firestore";

import { rootSaga } from "./rootSaga";
import { reducers } from "./rootReducer";

import { firebase } from "../services/firebase";
import { reactReduxFirebaseConfig } from "../config/reactReduxFirebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
