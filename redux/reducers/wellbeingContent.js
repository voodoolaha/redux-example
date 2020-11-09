// @flow

import { type TWellbeingArticle } from "../../interface/wellbeingArticle";
import {
  FETCH_ARTICLE_LIST_ASYNC,
  FETCH_ARTICLE_LIST_SUCCESS,
  FETCH_ARTICLE_LIST_ERROR,
  FETCH_ARTICLE_ASYNC,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  OPEN_ARTICLE_POPUP,
  CLOSE_ARTICLE_POPUP,
  type TWellbeingContentActionTypes,
} from "../constants/wellbeingContent";


export type TWellbeingContentStore = {
  articles: Array<TWellbeingArticle>;
  article: ?TWellbeingArticle;
  loading: boolean;
  fetchError: boolean;
  popupOpened: boolean;
  popupItem: ?TWellbeingArticle;
}

const initialState: TWellbeingContentStore = {
  articles: [],
  article: null,
  loading: false,
  fetchError: false,
  popupOpened: false,
  popupItem: null,
};


const wellbeingContentReducer = (
  state: TWellbeingContentStore = initialState,
  action: TWellbeingContentActionTypes,
) => {
  switch (action.type) {
    case OPEN_ARTICLE_POPUP:
      return {
        ...state,
        popupOpened: true,
        popupItem: action.payload.article,
      };
    case CLOSE_ARTICLE_POPUP:
      return {
        ...state,
        popupOpened: false,
        popupItem: null,
      };
    case FETCH_ARTICLE_LIST_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ARTICLE_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        articles: action.payload.articles,
      };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchError: false,
        article: action.payload.article,
      };
    case FETCH_ARTICLE_LIST_ERROR:
    case FETCH_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: true,
      };
    default:
      return { ...state };
  }
};


export { wellbeingContentReducer };
