import { Box, Button, Typography } from "@mui/material";
import styles from "../styles/ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box className={styles.errorPage}>
      <Typography variant="h1">404</Typography>
      <Typography fontSize={20}>Page non trouvée.</Typography>
      <Button onClick={() => navigate("/")} variant="contained">
        Retourner à l'accueil
      </Button>
    </Box>
  );
}

export default ErrorPage;
