import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import { Mail } from "@mui/icons-material";
import HomeNewsList from "../components/HomeNewsList";
import { Img } from "../components/templates/Img";
import homePic from "../assets/home_pic.webp";

function Home() {
  return (
    <Box className={styles.home}>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          alignItems="center"
          textAlign="left"
        >
          <Typography
            variant="h4"
            component={"h1"}
            fontWeight={600}
            sx={{ width: "100%" }}
          >
            Mahjong Kosaki
          </Typography>

          <Typography>
            Mahjong Kosaki est une communauté accueillante pour les passionnés
            du jeu de Riichi Mahjong. Nous sommes dédiés à rassembler des
            joueurs de tous niveaux - des débutants désireux d'apprendre les
            bases aux vétérans expérimentés cherchant à perfectionner leurs
            stratégies.
          </Typography>

          <Typography>
            Notre communauté offre un environnement amical et inclusif où les
            membres peuvent profiter de jeux réguliers, participer à des
            tournois et partager leur passion pour ce jeu bien-aimé. Que vous
            soyez nouveau dans le Riichi Mahjong ou un joueur de longue date,
            vous trouverez une communauté soutenante et amusante chez Mahjong
            Kosaki !
          </Typography>

          <Typography>
            Nous organisons des événements et des sessions d'apprentissage pour
            que chacun puisse progresser à son rythme, tout en créant des liens
            avec d'autres passionnés. De plus, notre communauté met à
            disposition des ressources et des conseils pour améliorer les
            compétences de chacun. Que vous veniez pour vous détendre autour
            d'une table ou pour tester vos compétences lors de compétitions
            amicales, Mahjong Kosaki est l'endroit idéal pour vivre votre
            passion pour le Mahjong.
          </Typography>

          <Link to="calendar">
            <Button variant="contained">Demandez une initiation</Button>
          </Link>
        </Box>

        <Img
          alt="home-image"
          src={homePic}
          sx={{
            width: { md: 300, height: 300 },
            marginLeft: { sx: 0, md: 10 },
            objectFit: "contain",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

      <Box className={styles.homeContainer}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ width: { xs: "100%", md: 728, lg: 928 } }}
              gap={2}
            >
              <Typography variant="h5" component={"h2"} fontWeight={600}>
                Vous souhaitez adhérer ?
              </Typography>
              <Typography>
                L&apos;adhésion s&apos;étend de Septembre à fin Août de
                l&apos;année suivante.
              </Typography>
              <Typography>Tarif d'adhésion : 20€</Typography>
              <Typography>
                En adhérant à l&apos;association, vous adhérez également à la
                Fédération Française de Mahjong (10€ reversé), vous permettant
                ainsi de participer aux tournois proposés par cette dernière.
              </Typography>

              <Link to="subscription">
                <Button variant="contained">Rejoignez-nous !</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider className={styles.divider} />

      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}
        gap={2}
      >
        <Typography variant="h5" component={"h2"} fontWeight={600}>
          Les actualités
        </Typography>

        <HomeNewsList />

        <Link to="news" className={styles.link}>
          <Button color="inherit" variant="contained">
            Afficher plus
          </Button>
        </Link>
      </Box>

      <Divider className={styles.divider} />

      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}
        gap={2}
      >
        <Typography variant="h5" component={"h2"} fontWeight={600}>
          Des questions? Besoin d&apos;aide?
        </Typography>

        <Link to="contact" className={styles.link}>
          <Button variant="contained" startIcon={<Mail />}>
            Contactez-nous !
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
