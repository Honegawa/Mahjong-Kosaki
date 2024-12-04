import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Tournament,
  RootState as RootStateTournament,
  TournamentParticipant,
} from "../interfaces/tournament";
import * as ACTIONS_TOURNAMENT from "../redux/reducers/tournament";
import { oneTournament } from "../services/selectors/tournament.selector";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ENDPOINTS from "../utils/contants/endpoints";
import ErrorPage from "./ErrorPage";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/TournamentDetail.module.css";
import { DATETIME_FORMATTER } from "../utils/helpers/date.helper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function TournamentDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleTournamentStore: Tournament | undefined = useSelector(
    (state: RootStateTournament) => oneTournament(state)
  );

  useEffect(() => {
    getTournaments();
    getTournamentDetail();
  }, []);

  const getTournaments = async () => {
    dispatch(ACTIONS_TOURNAMENT.FETCH_START());

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

  const getTournamentDetail = async () => {
    dispatch(ACTIONS_TOURNAMENT.FETCH_START());

    try {
      if (id && id.match(/^[1-9]\d*$/)) {
        const response = axios.get(`${ENDPOINTS.TOURNAMENT}/${id}`);
        const { status } = await response;

        if (status === 200) {
          dispatch(ACTIONS_TOURNAMENT.FETCH_DETAIL(Number(id)));
          setLoading(false);
        }
      } else {
        throw new Error("Tournament doesn't exist.");
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.FETCH_FAILURE());
      setLoading(false);
    }
  };

  const columns = useMemo<GridColDef<TournamentParticipant>[]>(
    () => [
      { field: "firstname", headerName: "Prénom", minWidth: 120, flex: 2 },
      { field: "lastname", headerName: "Nom", minWidth: 120, flex: 2 },
      { field: "EMANumber", headerName: "N° EMA", minWidth: 120, flex: 2 },
    ],
    []
  );

  return singleTournamentStore ? (
    <Box className={styles.tournamentDetailContainer}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h4" component={"h1"} fontWeight={600}>
              {singleTournamentStore.name}
            </Typography>
            <Box>
              <Typography>
                {"Période : du "}
                {DATETIME_FORMATTER.format(
                  new Date(singleTournamentStore.startDate)
                )}
                {" au "}
                {DATETIME_FORMATTER.format(
                  new Date(singleTournamentStore.endDate)
                )}
              </Typography>
              <Typography>
                {"Date limite d’inscription : "}
                {DATETIME_FORMATTER.format(
                  new Date(singleTournamentStore.registerLimitDate)
                )}
              </Typography>
              <Typography>
                {`Frais d’entrée : ${singleTournamentStore.entryFee}€`}
              </Typography>
              <Typography>
                {`Limite de joueurs : ${singleTournamentStore.playerLimit}`}
              </Typography>
              <Typography>{`Lieu : ${singleTournamentStore.location}`}</Typography>
              <Typography>{`Description : ${singleTournamentStore.description}`}</Typography>
              <Typography>{`Organisation : ${singleTournamentStore.setup}`}</Typography>
            </Box>

            <Box maxHeight={600}>
              <DataGrid
                rows={singleTournamentStore.people}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                rowSelection={false}
                disableRowSelectionOnClick
                autosizeOptions={{
                  expand: true,
                  includeHeaders: true,
                  includeOutliers: true,
                  outliersFactor: 2,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  ) : loading ? (
    <></>
  ) : (
    <ErrorPage />
  );
}

export default TournamentDetail;
