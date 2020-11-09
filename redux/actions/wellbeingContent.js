// @flow

import { type TWellbeingArticle } from "../../interface/wellbeingArticle";
import {
  FETCH_ARTICLE_LIST_ASYNC,
  CREATE_ARTICLE_ASYNC,
  CHANGE_ARTICLE_STATUS_ASYNC,
  EDIT_ARTICLE_ASYNC,
  DELETE_ARTICLE_ASYNC,
  FETCH_ARTICLE_ASYNC,
  OPEN_ARTICLE_POPUP,
  CLOSE_ARTICLE_POPUP,
  type TCreateArticleAction,
  type TEditArticleAction,
  type TDeleteArticleAction,
  type TChangeArticleStatusAction,
  type TFetchArticlesAction,
  type TFetchArticleAction,
  type TOpenPopupAction,
  type TClosePopupAction,
} from "../constants/wellbeingContent";


export const fetchArticleListAsync = (): TFetchArticlesAction => ({
  type: FETCH_ARTICLE_LIST_ASYNC,
});

export const fetchArticleAsync = (id: number): TFetchArticleAction => ({
  type: FETCH_ARTICLE_ASYNC,
  payload: { id },
});

export const createArticleAsync = (article: FormData, uid: string): TCreateArticleAction => ({
  type: CREATE_ARTICLE_ASYNC,
  payload: { article, uid },
});

export const editArticleAsync = (article: FormData, id: number): TEditArticleAction => ({
  type: EDIT_ARTICLE_ASYNC,
  payload: { article, id },
});

export const deleteArticleAsync = (id: number): TDeleteArticleAction => ({
  type: DELETE_ARTICLE_ASYNC,
  payload: { id },
});

export const changeArticleStatusAsync = (id: number): TChangeArticleStatusAction => ({
  type: CHANGE_ARTICLE_STATUS_ASYNC,
  payload: { id },
});

export const openPopup = (article?: TWellbeingArticle): TOpenPopupAction => ({
  type: OPEN_ARTICLE_POPUP,
  payload: { article: article || null },
});

export const closePopup = (): TClosePopupAction => ({
  type: CLOSE_ARTICLE_POPUP,
});
