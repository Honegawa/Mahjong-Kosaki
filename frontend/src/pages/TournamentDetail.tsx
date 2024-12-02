import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Tournament,
  RootState as RootStateTournament,
  TournamentDetailData,
  TournamentParticipant,
} from "../interfaces/tournament";
import * as ACTIONS_TOURNAMENT from "../redux/reducers/tournament";
import { oneTournament } from "../services/selectors/tournament.selector";
import { useEffect, useMemo } from "react";
import axios from "axios";
import ENDPOINTS from "../utils/contants/endpoints";
import ErrorPage from "./ErrorPage";
import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/TournamentDetail.module.css";
import { DATETIME_FORMATTER } from "../utils/helpers/date.helper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function TournamentDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const tournamentStore: Tournament = useSelector(
    (state: RootStateTournament) => oneTournament(state)[0]
  );

  useEffect(() => {
    getTournamentDetail();
  }, []);

  const getTournamentDetail = async () => {
    dispatch(ACTIONS_TOURNAMENT.FETCH_START());

    try {
      if (id && id.match(/^[1-9]\d*$/)) {
        const response = axios.get(`${ENDPOINTS.TOURNAMENT}/${id}`);
        const { data, status } = await response;

        if (status === 200) {
          const tournamentDetail: TournamentDetailData = {
            data: data,
            id: Number(id),
          };
          dispatch(ACTIONS_TOURNAMENT.FETCH_DETAIL(tournamentDetail));
        }
      } else {
        throw new Error("Tournament doesn't exist.");
      }
    } catch (error) {
      dispatch(ACTIONS_TOURNAMENT.FETCH_FAILURE());
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

  return tournamentStore ? (
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
            <Typography variant="h4" component={"h1"}>
              {tournamentStore.name}
            </Typography>
            <Box>
              <Typography>
                {"Période : du "}
                {DATETIME_FORMATTER.format(new Date(tournamentStore.startDate))}
                {" au "}
                {DATETIME_FORMATTER.format(new Date(tournamentStore.endDate))}
              </Typography>
              <Typography>
                {"Date limite d’inscription : "}
                {DATETIME_FORMATTER.format(
                  new Date(tournamentStore.registerLimitDate)
                )}
              </Typography>
              <Typography>
                {`Frais d’entrée : ${tournamentStore.entryFee}€`}
              </Typography>
              <Typography>
                {`Limite de joueurs : ${tournamentStore.playerLimit}`}
              </Typography>
              <Typography>{`Lieu : ${tournamentStore.location}`}</Typography>
              <Typography>{`Description : ${tournamentStore.description}`}</Typography>
              <Typography>{`Organisation : ${tournamentStore.setup}`}</Typography>
            </Box>

            <Box maxHeight={600}>
              <DataGrid
                rows={tournamentStore.people}
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
  ) : (
    <ErrorPage />
  );
}

export default TournamentDetail;
