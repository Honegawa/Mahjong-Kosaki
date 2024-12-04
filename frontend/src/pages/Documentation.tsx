import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import styles from "../styles/Documentation.module.css";

function Documentation() {
  return (
    <Box sx={{ width: { xs: "100%", md: 800 } }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Documentation
      </Typography>
      <Box
        className={styles.documentationContainer}
        sx={{ marginTop: { xs: 1, md: 3 } }}
      >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Références
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://riichi.wiki/Main_Page"
                    target="_blank"
                  >
                    Riichi Wiki (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://dainachiba.github.io/RiichiBooks/"
                    target="_blank"
                  >
                    Riichi Book I de Daina Chiba (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://zes.sx/riichi/"
                    target="_blank"
                  >
                    Cheatsheets
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Outils
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://riichi.onecomp.one/#/"
                    target="_blank"
                  >
                    Riichi Tracker - Traqueur de partie et calculateur de points
                    (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://mahjong.horneds.com/"
                    target="_blank"
                  >
                    Riichi Score Trainer - Entraînement au calcul de points
                    (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://euophrys.itch.io/mahjong-efficiency-trainer"
                    target="_blank"
                  >
                    Mahjong Efficiency Trainer - Entraînement à l'efficience
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Organismes officiels
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://web.ffmahjong.fr/"
                    target="_blank"
                  >
                    La Fédération Française de Mahjong - FFMJ
                  </ListItem>
                  <ListItem
                    component="a"
                    href="http://mahjong-europe.org/portal/"
                    target="_blank"
                  >
                    European Mahjong Association - EMA
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://www.worldriichi.org/"
                    target="_blank"
                  >
                    World Riichi Championship - WRC
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Les autres clubs de Mahjong en France
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://web.ffmahjong.fr/les-clubs"
                    target="_blank"
                  >
                    Les clubs en France
                  </ListItem>
                  <ListItem
                    component="a"
                    href="http://mahjong-europe.org/portal/index.php?option=com_content&view=article&id=7&Itemid=137"
                    target="_blank"
                  >
                    Les clubs en Europe
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Où regarder des matchs
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://abema.tv/now-on-air/mahjong"
                    target="_blank"
                  >
                    Abema TV - Mahjong (Japonais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://www.twitch.tv/"
                    target="_blank"
                  >
                    Twitch (Mahjong Soul / Riichi City / Tenhou )
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://www.youtube.com/"
                    target="_blank"
                  >
                    Youtube (Mahjong Soul / Riichi City / Tenhou )
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h5" component={"h2"} fontWeight={600}>
                  Plateformes en ligne
                </Typography>
                <Divider />
                <List>
                  <ListItem
                    component="a"
                    href="https://mahjongsoul.yo-star.com/"
                    target="_blank"
                  >
                    Mahjong Soul (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://www.mahjong-jp.com/home"
                    target="_blank"
                  >
                    Riichi City (Anglais)
                  </ListItem>
                  <ListItem
                    component="a"
                    href="https://sega-mj.com/"
                    target="_blank"
                  >
                    Sega Mahjong (Japonais)
                  </ListItem>
                </List>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Documentation;
