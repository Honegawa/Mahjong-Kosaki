import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Article, RootState as RootStateArticle } from "../interfaces/article";
import { allArticles } from "../services/selectors/article.selector";

import ENDPOINTS from "../utils/contants/endpoints";
import axios from "axios";

import * as ACTIONS_ARTICLE from "../redux/reducers/article";
import ArticleListItem from "../components/ArticleListItem";

import { Container, Pagination, Typography } from "@mui/material";
import styles from "../styles/News.module.css";

import { sortBy } from "lodash";

function News() {
  const [page, setPage] = useState(1);
  const LIMIT_ITEMS = 5;
  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    allArticles(state)
  );
  const NB_PAGES = Math.ceil(articleStore.length / LIMIT_ITEMS);
  const sortedArticles = sortBy(articleStore, ["createdAt"]).reverse();
  const filteredArticles = sortedArticles.filter(
    (_article: Article, index: number) =>
      index >= LIMIT_ITEMS * (page - 1) && index < LIMIT_ITEMS * page
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

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container
      className={styles.news}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Actualités
      </Typography>
      {filteredArticles.map((article: Article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
      <Pagination
        count={NB_PAGES}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Container>
  );
}

export default News;
