import { configureStore } from "@reduxjs/toolkit";
import ArticleSlice from "./reducers/article";
import UserSlice from "./reducers/user";

export default configureStore({
  reducer: {
    articles: ArticleSlice,
    users: UserSlice,
  },
});
