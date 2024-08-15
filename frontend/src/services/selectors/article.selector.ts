import { RootState as RootStateArticle } from "../../interfaces/article";

export const allArticles = (state: RootStateArticle) => state.articles.data;

export const oneArticle = (state: RootStateArticle) => state.articles.data;
