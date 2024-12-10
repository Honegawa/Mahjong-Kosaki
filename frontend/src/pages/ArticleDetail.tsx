import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Article,
  ArticlePicture,
  RootState as RootStateArticle,
} from "../interfaces/article";

import ENDPOINTS from "../utils/contants/endpoints";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { oneArticle } from "../services/selectors/article.selector";
import * as ACTIONS_ARTICLE from "../redux/reducers/article";

import { Box, Container, Typography } from "@mui/material";
import { Img } from "../components/templates/Img";
import ErrorPage from "./ErrorPage";

function ArticleDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleArticleStore: Article | undefined = useSelector(
    (state: RootStateArticle) => oneArticle(state)
  );

  useEffect(() => {
    getArticles();
    getArticleDetail();
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

  const getArticleDetail = async () => {
    dispatch(ACTIONS_ARTICLE.FETCH_START());

    try {
      if (id && id.match(/^[1-9]\d*$/)) {
        const response = axios.get(`${ENDPOINTS.ARTICLE}/${id}`);
        const { status } = await response;

        if (status === 200) {
          dispatch(ACTIONS_ARTICLE.FETCH_DETAIL(Number(id)));
          setLoading(false);
        }
      } else {
        throw new Error("Article doesn't exist.");
      }
    } catch (error) {
      dispatch(ACTIONS_ARTICLE.FETCH_FAILURE());
      setLoading(false);
    }
  };

  return singleArticleStore ? (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        {singleArticleStore.title}
      </Typography>

      <Box
        display="flex"
        gap={2}
        justifyContent="center"
        textAlign="left"
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box maxWidth={700} width="100%">
          <Typography variant="caption">{`Publié le ${new Date(
            singleArticleStore.createdAt
          ).toLocaleDateString()}`}</Typography>
          <Typography>{singleArticleStore.content}</Typography>
        </Box>

        {singleArticleStore.pictures.length > 0 && (
          <Box
            maxWidth={400}
            display="flex"
            flexDirection="row"
            flexGrow={1}
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
          >
            {singleArticleStore.pictures?.map(
              (pic: ArticlePicture, index: number) => (
                <Link to={pic.picture} key={pic.picture} target="_blank">
                  <Img
                    src={pic.picture}
                    alt={`Photo article ${index}`}
                    sx={{ width: 170, height: 170, objectFit: "contain" }}
                  />
                </Link>
              )
            )}
          </Box>
        )}
      </Box>
    </Container>
  ) : loading ? (
    <></>
  ) : (
    <ErrorPage />
  );
}

export default ArticleDetail;
