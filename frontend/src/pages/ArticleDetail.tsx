import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Article,
  ArticleDetailData,
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    oneArticle(state)
  );

  useEffect(() => {
    getArticleDetail();
  }, []);

  const getArticleDetail = async () => {
    dispatch(ACTIONS_ARTICLE.FETCH_START());

    try {
      if (id && id.match(/^[1-9]\d*$/)) {
        const response = axios.get(`${ENDPOINTS.ARTICLE}/${id}`);
        const { data, status } = await response;

        if (status === 200) {
          const articleDetail: ArticleDetailData = {
            data: data,
            id: Number(id),
          };
          dispatch(ACTIONS_ARTICLE.FETCH_DETAIL(articleDetail));
        }
      } else {
        throw new Error("Article doesn't exist.");
      }
    } catch (error) {
      dispatch(ACTIONS_ARTICLE.FETCH_FAILURE());
    }
  };

  return articleStore[0] ? (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" component={"h1"}>
        {articleStore[0].title}
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
            articleStore[0].createdAt
          ).toLocaleDateString()}`}</Typography>
          <Typography>{articleStore[0].content}</Typography>
        </Box>

        {articleStore[0].pictures.length > 0 && (
          <Box
            maxWidth={400}
            display="flex"
            flexDirection="row"
            flexGrow={1}
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
          >
            {articleStore[0].pictures?.map(
              (pic: ArticlePicture, index: number) => (
                <Link to={pic.picture} key={pic.picture} target="_blank">
                  <Img
                    src={pic.picture}
                    alt={`Photo article ${index}`}
                    sx={{
                      width: { xs: "100%", md: 170 },
                      height: { md: 170 },
                      objectFit: "contain",
                    }}
                  />
                </Link>
              )
            )}
          </Box>
        )}
      </Box>
    </Container>
  ) : (
    <ErrorPage />
  );
}

export default ArticleDetail;
