import { useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../utils/contants/endpoints";
import { Article, RootState as RootStateArticle } from "../interfaces/article";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS_ARTICLE from "../redux/reducers/article";
import { allArticles } from "../services/selectors/article.selector";
import { Box, Typography } from "@mui/material";
import { Img } from "./templates/Img";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function HomeNewsList() {
  const dispatch = useDispatch();
  const articleStore: Article[] = useSelector((state: RootStateArticle) =>
    allArticles(state)
  );
  const lastThreeArticles = articleStore.slice(-3).reverse();

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
    <Box display="flex" gap={4} overflow="auto">
      {lastThreeArticles.map((article) => (
        <Box width={300} key={`article-${article.id}`} position="relative">
          <Link to={`articles/${article.id}`}>
            <Img
              src={
                article.pictures.length > 0
                  ? article.pictures[article.pictures.length - 1].picture
                  : logo
              }
              alt="Article cover"
              width={300}
              height={300}
              sx={{
                objectFit: "contain",
              }}
            />
            <Box
              position="absolute"
              bottom={0}
              padding={1}
              width="100%"
              boxSizing="border-box"
              textAlign="left"
              color="white"
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
              }}
            >
              <Typography
                variant="h6"
                component={"h3"}
                fontWeight={600}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {article.title}
              </Typography>
              <Typography>
                {new Date(article.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default HomeNewsList;
