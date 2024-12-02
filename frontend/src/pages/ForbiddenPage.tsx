import { Box, Button, Typography } from "@mui/material";
import styles from "../styles/ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <Box className={styles.errorPage}>
      <Typography variant="h1">403</Typography>
      <Typography fontSize={20}>Vous n'avez pas les droits nécessaires pour accéder à cette page.</Typography>
      <Button onClick={() => navigate("/")} variant="contained">
        Retourner à l'accueil
      </Button>
    </Box>
  );
}

export default ForbiddenPage;
