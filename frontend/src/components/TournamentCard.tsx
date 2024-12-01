import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Tournament } from "../interfaces/tournament";
import { memo } from "react";
import { DATETIME_FORMATTER } from "../utils/dateHelper";
import styles from "../styles/Tournaments.module.css";
import { useNavigate } from "react-router-dom";

type TournamentCardProps = {
  tournament: Tournament;
  tabIndex: number;
};

function TournamentCard(props: TournamentCardProps) {
  const { tournament, tabIndex } = props;
  const navigate = useNavigate();

  return (
    <Card className={styles.tournamentCard}>
      <CardHeader
        title={tournament.name}
        className={styles.tournamentCardHeader}
      />
      <CardContent className={styles.tournamentCardContent}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>Organisation : {tournament.setup}</Typography>
          <Typography>
            Date : {DATETIME_FORMATTER.format(new Date(tournament.startDate))} -{" "}
            {DATETIME_FORMATTER.format(new Date(tournament.endDate))}
          </Typography>
          <Typography>
            Inscription jusqu'au :{" "}
            {DATETIME_FORMATTER.format(new Date(tournament.registerLimitDate))}
          </Typography>
          <Typography>Lieu : {tournament.location}</Typography>
          <Typography>
            Frais (à payer sur place) : {tournament.entryFee}€
          </Typography>
        </Box>
      </CardContent>
      <CardActions className={styles.tournamentCardActions}>
        <Button
          onClick={() => navigate(`./${tournament.id}`)}
          variant="outlined"
          color="inherit"
        >
          Consulter
        </Button>
        {tabIndex <= 1 &&
          new Date().toISOString() < tournament.registerLimitDate && (
            <Button variant="contained" color="success">
              Participer
            </Button>
          )}
      </CardActions>
    </Card>
  );
}

export default memo(TournamentCard);
