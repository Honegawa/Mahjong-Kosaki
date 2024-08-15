import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Article, RootState as RootStateArticle } from "../interfaces/article";
import { allArticles } from "../services/selectors/article.selector";

import ENDPOINTS from "../utils/contants/endpoints";
import axios from "axios";

import * as ACTIONS_ARTICLE from "../redux/reducers/article";

function News() {
  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    allArticles(state)
  );

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    dispatch(ACTIONS_ARTICLE.FETCH_START());

    try {
      const response = await axios.get(ENDPOINTS.ARTICLE);
      const { data, status } = response;

      if (status === 200) {
        dispatch(ACTIONS_ARTICLE.FETCH_SUCCESS(data));
      }
    } catch (error) {
      dispatch(ACTIONS_ARTICLE.FETCH_FAILURE());
    }
  };

  return (
    <div>
      {articleStore.map((article: Article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}

export default News;
