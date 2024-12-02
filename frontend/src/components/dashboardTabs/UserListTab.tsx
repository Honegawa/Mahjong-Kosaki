import { Add } from "@mui/icons-material";
import { Box, Button, CardContent } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  USER_ROLE,
  UserDataTable,
  RootState as RootStateUser,
  User,
  AuthContextType,
  DeletedUser,
} from "../../interfaces/user";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../services/selectors/user.selectors";
import * as ACTIONS_USER from "../../redux/reducers/user";
import ENDPOINTS from "../../utils/contants/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import PersonForm from "./tabModals/PersonForm";
import DeleteDialog from "../DeleteDialog";
import WarningAlert from "../WarningAlert";
import { AuthContext } from "../../utils/contexts/Auth.context";

function UserListTab() {
  const [openModal, setOpenModal] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<UserDataTable>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userStore: UserDataTable[] = useSelector((state: RootStateUser) =>
    allUsers(state)
  );
  const { user } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    getUsers();
  }, []);

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

  const handleOpenCreate = () => setOpenModal(MODAL_TABS.createPerson);
  const handleOpenActionModal = useCallback(
    (id: GridRowId, modal: string) => () => {
      setOpenModal(modal);
      setSelectedPerson(userStore.find((user) => user.id === id));
    },
    [userStore]
  );

  const handleClose = () => {
    setOpenModal("");
    setSelectedPerson(undefined);
  };

  const handleDelete = async () => {
    if (!selectedPerson || !selectedPerson.id) return;
    if (user && user.id === selectedPerson.id) {
      setError(
        "Vous ne pouvez pas supprimer votre compte depuis cette interface."
      );
      handleClose();
      return;
    }

    try {
      dispatch(ACTIONS_USER.DELETE_START());

      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.PERSON}/${selectedPerson.id}`,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        const deleteUser: DeletedUser = {
          data: userStore,
          id: selectedPerson.id,
        };

        dispatch(ACTIONS_USER.DELETE_SUCCESS(deleteUser));

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError(
            "Une erreur est survenue lors de la suppression de lq personne."
          );
        }
      }

      dispatch(ACTIONS_USER.DELETE_FAILURE());
      handleClose();
    }
  };

  const columns = useMemo<GridColDef<UserDataTable>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", minWidth: 120, flex: 1 },
      { field: "lastname", headerName: "Nom", minWidth: 120, flex: 2 },
      { field: "firstname", headerName: "Prénom", minWidth: 120, flex: 2 },
      { field: "email", headerName: "Email", minWidth: 120, flex: 3 },
      { field: "EMANumber", headerName: "N° EMA", minWidth: 120, flex: 2 },
      { field: "phone", headerName: "Téléphone", minWidth: 120, flex: 2 },
      {
        field: "subscription",
        headerName: "Adhésion",
        type: "date",
        minWidth: 120,
        flex: 2,
        valueGetter: (value, row) => {
          return row.subscription ? new Date(row.subscription) : null;
        },
      },
      {
        field: "role",
        headerName: "Admin",
        type: "boolean",
        minWidth: 120,
        flex: 1,
        valueGetter: (value, row) => {
          return row.role === USER_ROLE.ADMIN;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        minWidth: 120,
        flex: 2,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<CreateIcon />}
            label="Modifier"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.editPerson)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Supprimer"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.delete)}
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
          Créer une personne
        </Button>

        <WarningAlert error={error} onClick={() => setError("")} />

        <DataGrid
          rows={userStore}
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

      {(openModal === MODAL_TABS.createPerson ||
        openModal === MODAL_TABS.editPerson) && (
        <PersonForm
          open={openModal}
          onClose={handleClose}
          selectedPerson={selectedPerson}
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

export default UserListTab;
