// @flow

import { type Saga } from "redux-saga";
import {
  all, call, put, takeEvery, take,
} from "redux-saga/effects";
import axios from "axios";

import api from "../../config/api";
import { makeHeader } from "../helpers/makeHeader";
import {
  FETCH_ARTICLE_LIST_ASYNC,
  FETCH_ARTICLE_LIST_SUCCESS,
  FETCH_ARTICLE_LIST_ERROR,
  CREATE_ARTICLE_ASYNC,
  CHANGE_ARTICLE_STATUS_ASYNC,
  EDIT_ARTICLE_ASYNC,
  DELETE_ARTICLE_ASYNC,
  FETCH_ARTICLE_ASYNC,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  CLOSE_ARTICLE_POPUP,
  type TFetchArticlesSuccessAction,
  type TFetchArticlesErrorAction,
  type TEditArticleAction,
  type TDeleteArticleAction,
  type TCreateArticleAction,
  type TChangeArticleStatusAction,
  type TFetchArticleAction,
  type TFetchArticleSuccessAction,
  type TFetchArticleErrorAction,
  type TClosePopupAction,
} from "../constants/wellbeingContent";
import { alertTypes } from "../reducers/alert";
import { showAlert } from "../helpers/showAlert";
import { getErrorMessage } from "../helpers/errorMessage";


function* fetchArticleListAsync(): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/wellbeing/article/list`, makeHeader()),
    );

    yield put<TFetchArticlesSuccessAction>({
      type: FETCH_ARTICLE_LIST_SUCCESS,
      payload: { articles: response.data },
    });
  } catch (e) {
    yield put<TFetchArticlesErrorAction>({
      type: FETCH_ARTICLE_LIST_ERROR,
    });
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchArticleListWatcher(): Saga<void> {
  yield takeEvery(FETCH_ARTICLE_LIST_ASYNC, fetchArticleListAsync);
}


function* fetchArticleAsync(action: TFetchArticleAction): Saga<void> {
  try {
    const response = yield call(
      () => axios.get(`${api.BASE_URL}/wellbeing/article?id=${action.payload.id}`, makeHeader()),
    );

    yield put<TFetchArticleSuccessAction>({
      type: FETCH_ARTICLE_SUCCESS,
      payload: { article: response.data },
    });
  } catch (e) {
    yield put<TFetchArticleErrorAction>({
      type: FETCH_ARTICLE_ERROR,
    });

    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* fetchArticleWatcher(): Saga<void> {
  yield takeEvery(FETCH_ARTICLE_ASYNC, fetchArticleAsync);
}


function* createArticleAsync(action: TCreateArticleAction): Saga<void> {
  const { article, uid } = action.payload;

  try {
    yield call(
      () => axios.post(`${api.BASE_URL}/wellbeing/article?uid=${uid}`, article, makeHeader()),
    );

    yield call(fetchArticleListAsync);
    yield put<TClosePopupAction>({ type: CLOSE_ARTICLE_POPUP });
    yield call(showAlert, {
      content: "Article has been created",
      type: alertTypes.SUCCESS,
      duration: 3000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* createArticleWatcher(): Saga<void> {
  while (true) {
    const action: TCreateArticleAction = yield take(CREATE_ARTICLE_ASYNC);
    yield call(createArticleAsync, action);
  }
}


function* editArticleAsync(action: TEditArticleAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/wellbeing/article`, action.payload.article, makeHeader()),
    );

    yield call(fetchArticleListAsync);
    yield put<TFetchArticleAction>({
      type: FETCH_ARTICLE_ASYNC,
      payload: { id: action.payload.id },
    });
    yield put<TClosePopupAction>({ type: CLOSE_ARTICLE_POPUP });
    yield call(showAlert, {
      content: "Article has been edited",
      type: alertTypes.SUCCESS,
      duration: 3000,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* editArticleWatcher(): Saga<void> {
  while (true) {
    const action: TEditArticleAction = yield take(EDIT_ARTICLE_ASYNC);
    yield call(editArticleAsync, action);
  }
}


function* changeArticleStatusAsync(action: TChangeArticleStatusAction): Saga<void> {
  try {
    yield call(
      () => axios.patch(`${api.BASE_URL}/wellbeing/article/status?article_id=${action.payload.id}`, {}, makeHeader()),
    );
    yield call(showAlert, {
      content: "Article status has been changed",
      type: alertTypes.INFO,
      duration: 1500,
    });
  } catch (e) {
    yield call(fetchArticleListAsync);
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* changeArticleStatusWatcher(): Saga<void> {
  while (true) {
    const action: TChangeArticleStatusAction = yield take(CHANGE_ARTICLE_STATUS_ASYNC);
    yield call(changeArticleStatusAsync, action);
  }
}

function* deleteArticleAsync(action: TDeleteArticleAction): Saga<void> {
  try {
    yield call(
      () => axios.delete(`${api.BASE_URL}/wellbeing/article?id=${action.payload.id}`, makeHeader()),
    );

    yield call(fetchArticleListAsync);
    yield call(showAlert, {
      content: "Article has been deleted",
      type: alertTypes.SUCCESS,
      duration: 1500,
    });
  } catch (e) {
    yield call(showAlert, {
      content: getErrorMessage(e),
      type: alertTypes.ERROR,
      duration: 4000,
    });
  }
}

function* deleteArticleWatcher(): Saga<void> {
  yield takeEvery(DELETE_ARTICLE_ASYNC, deleteArticleAsync);
}


export function* rootWellbeingContentSaga(): Saga<void> {
  yield all([
    call(fetchArticleListWatcher),
    call(fetchArticleWatcher),
    call(createArticleWatcher),
    call(editArticleWatcher),
    call(changeArticleStatusWatcher),
    call(deleteArticleWatcher),
  ]);
}
