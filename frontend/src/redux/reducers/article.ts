import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticleDetailData } from "../../interfaces/article";

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
      draft.data = action.payload.data.filter((a) => a.id == action.payload.id);
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
} = ArticleSlice.actions;

export default ArticleSlice.reducer;
