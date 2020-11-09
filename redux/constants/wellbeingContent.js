// @flow

import { type TWellbeingArticle } from "../../interface/wellbeingArticle";

export const FETCH_ARTICLE_LIST_ASYNC: "FETCH_ARTICLE_LIST_ASYNC" = "FETCH_ARTICLE_LIST_ASYNC";
export const FETCH_ARTICLE_LIST_SUCCESS: "FETCH_ARTICLE_LIST_SUCCESS" = "FETCH_ARTICLE_LIST_SUCCESS";
export const FETCH_ARTICLE_LIST_ERROR: "FETCH_ARTICLE_LIST_ERROR" = "FETCH_ARTICLE_LIST_ERROR";

export const CREATE_ARTICLE_ASYNC: "CREATE_ARTICLE_ASYNC" = "CREATE_ARTICLE_ASYNC";

export const CHANGE_ARTICLE_STATUS_ASYNC: "CHANGE_ARTICLE_STATUS_ASYNC" = "CHANGE_ARTICLE_STATUS_ASYNC";

export const EDIT_ARTICLE_ASYNC: "EDIT_ARTICLE_ASYNC" = "EDIT_ARTICLE_ASYNC";

export const DELETE_ARTICLE_ASYNC: "DELETE_ARTICLE_ASYNC" = "DELETE_ARTICLE_ASYNC";

export const FETCH_ARTICLE_ASYNC: "FETCH_ARTICLE_ASYNC" = "FETCH_ARTICLE_ASYNC";
export const FETCH_ARTICLE_SUCCESS: "FETCH_ARTICLE_SUCCESS" = "FETCH_ARTICLE_SUCCESS";
export const FETCH_ARTICLE_ERROR: "FETCH_ARTICLE_ERROR" = "FETCH_ARTICLE_ERROR";

export const OPEN_ARTICLE_POPUP: "OPEN_ARTICLE_POPUP" = "OPEN_ARTICLE_POPUP";
export const CLOSE_ARTICLE_POPUP: "CLOSE_ARTICLE_POPUP" = "CLOSE_ARTICLE_POPUP";

// client initiated actions
export type TFetchArticlesAction = {
  type: typeof FETCH_ARTICLE_LIST_ASYNC,
}

export type TFetchArticleAction = {
  type: typeof FETCH_ARTICLE_ASYNC,
  payload: {
    id: number,
  }
}

export type TCreateArticleAction = {
  type: typeof CREATE_ARTICLE_ASYNC,
  payload: {
    article: FormData,
    uid: string,
  }
}

export type TEditArticleAction = {
  type: typeof EDIT_ARTICLE_ASYNC,
  payload: {
    article: FormData,
    id: number,
  }
}

export type TChangeArticleStatusAction = {
  type: typeof CHANGE_ARTICLE_STATUS_ASYNC,
  payload: {
    id: number,
  }
}

export type TDeleteArticleAction = {
  type: typeof DELETE_ARTICLE_ASYNC,
  payload: {
    id: number,
  }
}

export type TOpenPopupAction = {
  type: typeof OPEN_ARTICLE_POPUP,
  payload: {
    article: ?TWellbeingArticle,
  }
}

export type TClosePopupAction = {
  type: typeof CLOSE_ARTICLE_POPUP,
}

// saga initiated actions
export type TFetchArticlesSuccessAction = {
    type: typeof FETCH_ARTICLE_LIST_SUCCESS,
    payload: {
      articles: Array<TWellbeingArticle>
    }
}

export type TFetchArticlesErrorAction = {
  type: typeof FETCH_ARTICLE_LIST_ERROR,
}

export type TFetchArticleSuccessAction = {
  type: typeof FETCH_ARTICLE_SUCCESS,
  payload: {
    article: TWellbeingArticle,
  }
}

export type TFetchArticleErrorAction = {
  type: typeof FETCH_ARTICLE_ERROR,
}


export type TWellbeingContentActionTypes = TFetchArticlesAction
  | TCreateArticleAction
  | TEditArticleAction
  | TDeleteArticleAction
  | TChangeArticleStatusAction
  | TFetchArticlesSuccessAction
  | TFetchArticlesErrorAction
  | TFetchArticleAction
  | TFetchArticleSuccessAction
  | TFetchArticleErrorAction
  | TOpenPopupAction
  | TClosePopupAction
