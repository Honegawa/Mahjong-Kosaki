import { Add, GroupAdd, GroupRemove } from "@mui/icons-material";
import { Box, Button, CardContent } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import {
  Tournament,
  RootState as RootStateTournament,
  DeletedTournament,
} from "../../interfaces/tournament";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import WarningAlert from "../WarningAlert";
import { allTournaments } from "../../services/selectors/tournament.selector";
import * as ACTIONS_TOURNAMENT from "../../redux/reducers/tournament";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../utils/contants/endpoints";
import DeleteDialog from "../DeleteDialog";
import TournamentForm from "./tabModals/TournamentForm";
import AddParticipantForm from "./tabModals/AddParticipantForm";
import {
  User,
  UserDataTable,
  RootState as RootStateUser,
} from "../../interfaces/user";
import * as ACTIONS_USER from "../../redux/reducers/user";
import { allUsers } from "../../services/selectors/user.selectors";
import RemoveParticipantForm from "./tabModals/RemoveParticipantForm";

function TournamentTab() {
  const [openModal, setOpenModal] = useState("");
  const [selectedTournament, setSelectedTournament] = useState<Tournament>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const tournamentStore: Tournament[] = useSelector(
    (state: RootStateTournament) => allTournaments(state)
  );
  const userStore: UserDataTable[] = useSelector((state: RootStateUser) =>
    allUsers(state)
  );

  useEffect(() => {
    getTournaments();
    getUsers();
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

  const getUsers = async () => {
    dispatch(ACTIONS_USER.FETCH_START());

    try {
      const response = await axios.get(ENDPOINTS.PERSON);
      const { data, status } = response;

      if (status === 200) {
        const formatData: UserDataTable[] = data.map((e: User) => ({
          id: e.id,
          firstname: e.firstname,
          lastname: e.lastname,
          email: e.email,
          phone: e.phone,
          subscription: e.subscription,
          EMANumber: e.EMANumber,
          role: e.role,
        }));

        dispatch(ACTIONS_USER.FETCH_SUCCESS(formatData));
      }
    } catch (error) {
      dispatch(ACTIONS_USER.FETCH_FAILURE());
    }
  };

  const handleOpenCreate = () => setOpenModal(MODAL_TABS.createTournament);
  const handleOpenActionModal = useCallback(
    (id: GridRowId, modal: string) => () => {
      setOpenModal(modal);
      setSelectedTournament(
        tournamentStore.find((tournament) => tournament.id === id)
      );
    },
    [tournamentStore]
  );

  const handleClose = () => {
    setOpenModal("");
    setSelectedTournament(undefined);
  };

  const handleDelete = async () => {
    if (!selectedTournament || !selectedTournament.id) return;

    try {
      dispatch(ACTIONS_TOURNAMENT.DELETE_START());

      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.TOURNAMENT}/${selectedTournament.id}`,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        const deletedTournament: DeletedTournament = {
          data: tournamentStore,
          id: selectedTournament.id,
        };

        dispatch(ACTIONS_TOURNAMENT.DELETE_SUCCESS(deletedTournament));

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError(
            "Une erreur est survenue lors de la suppression du tournoi."
          );
        }
      }

      dispatch(ACTIONS_TOURNAMENT.DELETE_FAILURE());
      handleClose();
    }
  };

  const columns = useMemo<GridColDef<Tournament>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", minWidth: 120, flex: 1 },
      { field: "name", headerName: "Nom", minWidth: 120, flex: 2 },
      {
        field: "description",
        headerName: "Description",
        minWidth: 120,
        flex: 4,
      },
      { field: "setup", headerName: "Organisation", minWidth: 120, flex: 4 },
      {
        field: "startDate",
        headerName: "Date de début",
        type: "dateTime",
        minWidth: 120,
        flex: 2,
        valueGetter: (_value, row) => {
          return new Date(row.startDate);
        },
      },
      {
        field: "endDate",
        headerName: "Date de fin",
        type: "dateTime",
        minWidth: 120,
        flex: 2,
        valueGetter: (_value, row) => {
          return new Date(row.endDate);
        },
      },
      {
        field: "registerLimitDate",
        headerName: "Date limite",
        type: "dateTime",
        minWidth: 120,
        flex: 2,
        valueGetter: (_value, row) => {
          return new Date(row.registerLimitDate);
        },
      },
      {
        field: "entryFee",
        headerName: "Frais d'entrée",
        minWidth: 120,
        flex: 1,
      },
      {
        field: "playerLimit",
        headerName: "Participants",
        minWidth: 120,
        flex: 1,
        valueGetter: (_value, row) => {
          return `${row.people.length} / ${row.playerLimit}`;
        },
      },
      { field: "location", headerName: "Lieu", minWidth: 120, flex: 4 },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        type: "actions",
        flex: 3,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<CreateIcon />}
            label="Modifier"
            onClick={handleOpenActionModal(
              params.id,
              MODAL_TABS.editTournament
            )}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Supprimer"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.delete)}
          />,
          <GridActionsCellItem
            icon={<GroupAdd />}
            label="Ajouter un participant"
            onClick={handleOpenActionModal(
              params.id,
              MODAL_TABS.addParticipant
            )}
            showInMenu
            disabled={params.row.people.length === params.row.playerLimit}
          />,
          <GridActionsCellItem
            icon={<GroupRemove />}
            label="Retirer un participant"
            onClick={handleOpenActionModal(
              params.id,
              MODAL_TABS.removeParticipant
            )}
            showInMenu
            disabled={params.row.people.length === 0}
          />,
        ],
      },
    ],
    [handleOpenActionModal]
  );

  return (
    <CardContent>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          minHeight: 600,
          maxHeight: { xs: 600, md: 800 },
          width: "100%",
        }}
      >
        <Button
          onClick={handleOpenCreate}
          color="success"
          variant="contained"
          startIcon={<Add />}
          sx={{ width: "fit-content" }}
        >
          Créer un tournoi
        </Button>

        <WarningAlert error={error} onClick={() => setError("")} />

        <DataGrid
          rows={tournamentStore}
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
          slots={{ toolbar: GridToolbar }}
          autosizeOptions={{
            expand: true,
            includeHeaders: true,
            includeOutliers: true,
            outliersFactor: 2,
          }}
        />
      </Box>

      {(openModal === MODAL_TABS.createTournament ||
        openModal === MODAL_TABS.editTournament) && (
        <TournamentForm
          open={openModal}
          onClose={handleClose}
          selectedTournament={selectedTournament}
        />
      )}
      {openModal === MODAL_TABS.addParticipant && (
        <AddParticipantForm
          open={openModal}
          selectedTournament={selectedTournament}
          onClose={handleClose}
          tournamentStore={tournamentStore}
          userStore={userStore}
        />
      )}
      {openModal === MODAL_TABS.removeParticipant && (
        <RemoveParticipantForm
          open={openModal}
          selectedTournament={selectedTournament}
          onClose={handleClose}
          tournamentStore={tournamentStore}
          userStore={userStore}
        />
      )}

      {openModal === MODAL_TABS.delete && (
        <DeleteDialog
          open={openModal}
          onClose={handleClose}
          onConfirm={handleDelete}
        />
      )}
    </CardContent>
  );
}

export default TournamentTab;
