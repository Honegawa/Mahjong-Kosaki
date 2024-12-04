import { useDispatch, useSelector } from "react-redux";
import { filteredTournaments } from "../services/selectors/tournament.selector";
import {
  Tournament,
  RootState as RootStateTournament,
} from "../interfaces/tournament";
import * as ACTIONS_TOURNAMENT from "../redux/reducers/tournament";
import { useEffect, useState } from "react";
import axios from "axios";
import ENDPOINTS from "../utils/contants/endpoints";
import {
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { TOURNAMENT_TABS } from "../utils/contants/tournament";
import styles from "../styles/Tournaments.module.css";
import TournamentCard from "../components/TournamentCard";

function Tournaments() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  const filteredTournamentStore: Tournament[] = useSelector(
    (state: RootStateTournament) => filteredTournaments(state)
  );

  useEffect(() => {
    getTournaments();
  }, []);

  const getTournaments = async () => {
    dispatch(ACTIONS_TOURNAMENT.FETCH_START());
    dispatch(ACTIONS_TOURNAMENT.TAB_UPDATE(selectedIndex));

    try {
      const response = await axios.get(ENDPOINTS.TOURNAMENT);
      const { data, status } = response;

      if (status === 200) {
        dispatch(ACTIONS_TOURNAMENT.FETCH_SUCCESS(data));
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.FETCH_FAILURE());
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    dispatch(ACTIONS_TOURNAMENT.TAB_UPDATE(index));
  };

  const tabList = (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="tournament tabs">
        {TOURNAMENT_TABS.map((tab, index) => (
          <ListItemButton
            key={tab}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{ borderRadius: 2 }}
          >
            <ListItemText primary={tab} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box width="100%">
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Tournois
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 1, md: 4 },
          marginTop: { xs: 1, md: 3 },
        }}
        width="100%"
      >
        <Box>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <Button onClick={toggleDrawer(true)} variant="contained">
              Ouvrir le menu
            </Button>
            <Drawer open={openMenu} onClose={toggleDrawer(false)}>
              {tabList}
            </Drawer>
          </Box>
          <Box sx={{ display: { xs: "none", lg: "flex" }, minWidth: "220px" }}>
            {tabList}
          </Box>
        </Box>

        <Box className={styles.tournamentContainer}>
          <Card>
            <CardContent
              sx={{
                overflow: "auto",
                minHeight: 600,
                maxHeight: { xs: 600, md: 800 },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{
                  width: "100%",
                }}
              >
                {filteredTournamentStore.map((tournament) => (
                  <TournamentCard
                    key={`tournament-${tournament.id}`}
                    tournament={tournament}
                    tabIndex={selectedIndex}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Tournaments;
