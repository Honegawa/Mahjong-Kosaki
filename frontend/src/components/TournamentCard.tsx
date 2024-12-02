import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import {
  Tournament,
  RootState as RootStateTournament,
  TournamentParticipant,
  UpdatedTournament,
} from "../interfaces/tournament";
import { memo, useContext, useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { DATETIME_FORMATTER } from "../utils/helpers/date.helper";
import styles from "../styles/Tournaments.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/contexts/Auth.context";
import { AuthContextType } from "../interfaces/user";
import * as ACTIONS_TOURNAMENT from "../redux/reducers/tournament";
import { useDispatch, useSelector } from "react-redux";
import { allTournaments } from "../services/selectors/tournament.selector";
import { ParticipantForm } from "../interfaces/participant";
import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "../utils/contants/endpoints";

type TournamentCardProps = {
  tournament: Tournament;
  tabIndex: number;
};

function TournamentCard(props: TournamentCardProps) {
  const { tournament, tabIndex } = props;
  const { user } = useContext(AuthContext) as AuthContextType;
  const [isParticipating, setIsParticipating] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tournamentStore: Tournament[] = useSelector(
    (state: RootStateTournament) => allTournaments(state)
  );

  useEffect(() => {
    let participate = false;
    if (user) {
      const participant = tournament.people.find(
        (person) => person.id === user.id
      );
      participate = participant ? true : false;
    }
    setIsParticipating(participate);
  }, [tournament.people, user]);

  const handleParticipate = () => {
    if (user) {
      const participating: boolean = !isParticipating;
      setIsParticipating(participating);

      if (participating) {
        createParticipant();
      } else {
        removeParticipate();
      }
    }
  };

  const createParticipant = async () => {
    if (!user || !tournament || !tournament.id) return;

    const { id, firstname, lastname, email, EMANumber } = user;
    if (id == undefined || EMANumber === undefined) return;

    try {
      const participant: ParticipantForm = {
        PersonId: id,
        TournamentId: tournament.id,
      };
      const response: AxiosResponse = await axios.post(
        ENDPOINTS.PARTICIPANT,
        participant,
        { withCredentials: true }
      );

      const { status } = response;

      if (status === 201) {
        const addedParticipant: TournamentParticipant = {
          id,
          firstname,
          lastname,
          email,
          EMANumber,
        };

        const tournamentClone = cloneDeep(tournament);
        tournamentClone.people.push(addedParticipant);

        const updatedTournament: UpdatedTournament = {
          data: tournamentStore,
          update: tournamentClone,
        };

        dispatch(ACTIONS_TOURNAMENT.UPDATE_SUCCESS(updatedTournament));
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.UPDATE_FAILURE());
    }
  };

  const removeParticipate = async () => {
    if (!user || !user.id || !tournament || !tournament.id) return;

    dispatch(ACTIONS_TOURNAMENT.UPDATE_START());
    try {
      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.PARTICIPANT}/tournament/${tournament.id}/person/${user.id}`,
        { withCredentials: true }
      );

      const { status } = response;

      if (status === 200) {
        const tournamentClone = cloneDeep(tournament);
        const filteredParticipant = tournamentClone.people.filter(
          (person) => person.id !== user.id
        );
        tournamentClone.people = filteredParticipant;

        const updatedTournament: UpdatedTournament = {
          data: tournamentStore,
          update: tournamentClone,
        };

        dispatch(ACTIONS_TOURNAMENT.UPDATE_SUCCESS(updatedTournament));
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.UPDATE_FAILURE());
    }
  };

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
          <Typography>
            Participants : {tournament.people.length} / {tournament.playerLimit}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
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
            <Button
              variant="contained"
              color={isParticipating ? "error" : "success"}
              onClick={handleParticipate}
            >
              {isParticipating ? "Se retirer" : "Participer"}
            </Button>
          )}
      </CardActions>
    </Card>
  );
}

export default memo(TournamentCard);
