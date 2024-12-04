import { createSelector } from "@reduxjs/toolkit";
import { RootState as RootStateArticle } from "../../interfaces/article";

export const allArticles = (state: RootStateArticle) => state.articles.data;

export const oneArticle = createSelector(
  (state: RootStateArticle) => state.articles.data,
  (state: RootStateArticle) => state.articles.id,
  (data, id) => {
    return data.find((article) => article.id === id);
  }
);
