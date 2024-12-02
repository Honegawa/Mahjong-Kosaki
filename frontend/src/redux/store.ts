import { configureStore } from "@reduxjs/toolkit";
import ArticleSlice from "./reducers/article";
import UserSlice from "./reducers/user";
import TournamentSlice from "./reducers/tournament";

export default configureStore({
  reducer: {
    articles: ArticleSlice,
    users: UserSlice,
    tournaments: TournamentSlice,
  },
});
