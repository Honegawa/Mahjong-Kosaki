import { Box, Card, CardContent, Typography } from "@mui/material";
import { Article } from "../interfaces/article";
import logo from "../assets/logo.svg";
import { Img } from "./templates/Img";
import { useNavigate } from "react-router-dom";

function ArticleListItem({ article }: { article: Article }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ display: "flex", alignItems: "center", textAlign: "left" }}
      onClick={() => navigate(`/articles/${article.id}`)}
    >
      <Img
        src={
          article.articlePictures ? article.articlePictures[0].picture : logo
        }
        alt="Article cover"
        sx={{
          padding: 1,
          width: { xs: 80, md: 170 },
          height: { xs: 80, md: 170 },
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {article.content}
        </Typography>
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
