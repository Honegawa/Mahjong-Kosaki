import { Box, Card, CardContent, Typography } from "@mui/material";
import { Article } from "../interfaces/article";
import logo from "../assets/logo.svg";
import { Img } from "./templates/Img";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ArticleCard.module.css";

function ArticleListItem({ article }: { article: Article }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ display: "flex", alignItems: "center", textAlign: "left" }}
      onClick={() => navigate(`/articles/${article.id}`)}
    >
      <Img
        src={
          article.pictures.length > 0
            ? article.pictures[article.pictures.length - 1].picture
            : logo
        }
        alt="Article cover"
        sx={{
          padding: 1,
          width: { xs: 80, md: 170 },
          height: { xs: 80, md: 170 },
          objectFit: "contain",
        }}
      />
      <CardContent className={styles.articlesCardContent}>
        <Box sx={{ maxHeight: { xs: 120, md: 192 } }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.title}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: { xs: "1", md: "3", lg: "4" },
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.content}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="caption" sx={{}}>
            {new Date(article.updatedAt).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ArticleListItem;
