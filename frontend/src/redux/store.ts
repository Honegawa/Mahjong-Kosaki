import { configureStore } from "@reduxjs/toolkit";
import ArticleSlice from "./reducers/article";

export default configureStore({
  reducer: {
    articles: ArticleSlice,
  },
});
