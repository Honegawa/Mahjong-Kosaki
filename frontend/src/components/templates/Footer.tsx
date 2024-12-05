import { Typography } from "@mui/material";
import styles from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography>
        Copyright 2024 ©MahjongKosaki - Tous droits réservés.
      </Typography>
      <Typography variant="overline">
        <Link to="/mentions-legales">Mentions légales</Link> |{" "}
        <Link to="/conditions-generales-utilisation">
          Conditions Générales d'Utilisation
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
