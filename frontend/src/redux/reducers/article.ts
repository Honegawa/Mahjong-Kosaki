import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Article,
  ArticleDetailData,
  DeletedArticle,
  UpdatedArticle,
} from "../../interfaces/article";

type ArticleInitialeState = {
  data: Article[];
  loading: boolean | null;
  error: boolean;
};

const initialState: ArticleInitialeState = {
  data: [],
  loading: null,
  error: false,
};

export const ArticleSlice = createSlice({
  name: "Articles",
  initialState: initialState,
  reducers: {
    FETCH_START: (draft: ArticleInitialeState) => {
      draft.loading = true;
    },
    FETCH_SUCCESS: (
      draft: ArticleInitialeState,
      action: PayloadAction<Article[]>
    ) => {
      draft.loading = false;
      draft.data = action.payload;
    },
    FETCH_DETAIL: (
      draft: ArticleInitialeState,
      action: PayloadAction<ArticleDetailData>
    ) => {
      draft.loading = false;
      draft.data = [action.payload.data];
    },
    FETCH_FAILURE: (draft: ArticleInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    POST_START: (draft: ArticleInitialeState) => {
      draft.loading = true;
    },
    POST_SUCCESS: (
      draft: ArticleInitialeState,
      action: PayloadAction<Article>
    ) => {
      draft.loading = false;
      draft.data.push(action.payload);
    },
    POST_FAILURE: (draft: ArticleInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    UPDATE_START: (store: ArticleInitialeState) => {
      store.loading = true;
    },
    UPDATE_SUCCESS: (
      store: ArticleInitialeState,
      actions: PayloadAction<UpdatedArticle>
    ) => {
      const newArticle = actions.payload.update;
      const articles = actions.payload.data;
      const newArticles: Article[] = [];

      articles.map((article: Article) => {
        if (article.id === newArticle.id) {
          newArticles.push(newArticle);
        } else {
          newArticles.push(article);
        }
      });

      store.loading = false;
      store.data = newArticles;
    },
    UPDATE_FAILURE: (store: ArticleInitialeState) => {
      store.loading = false;
      store.error = true;
    },
    DELETE_START: (draft: ArticleInitialeState) => {
      draft.loading = true;
    },
    DELETE_SUCCESS: (
      draft: ArticleInitialeState,
      actions: PayloadAction<DeletedArticle>
    ) => {
      draft.loading = false;
      draft.data = actions.payload.data.filter(
        (article: Article) => article.id !== actions.payload.id
      );
    },
    DELETE_FAILURE: (draft: ArticleInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
  },
});

export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_DETAIL,
  FETCH_FAILURE,
  POST_START,
  POST_SUCCESS,
  POST_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} = ArticleSlice.actions;

export default ArticleSlice.reducer;
