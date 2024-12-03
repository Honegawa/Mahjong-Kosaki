import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Booking,
  DeletedBooking,
  RootState as RootStateBooking,
} from "../../interfaces/booking";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS_BOOKING from "../../redux/reducers/booking";
import { allBookings } from "../../services/selectors/booking.selector";
import {
  UserDataTable,
  RootState as RootStateUser,
  User,
} from "../../interfaces/user";
import * as ACTIONS_USER from "../../redux/reducers/user";
import { allUsers } from "../../services/selectors/user.selectors";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../../utils/contants/endpoints";
import { MODAL_TABS } from "../../utils/contants/dashboard";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Button, CardContent } from "@mui/material";
import { Add } from "@mui/icons-material";
import WarningAlert from "../WarningAlert";
import DeleteDialog from "../DeleteDialog";
import BookingForm from "./tabModals/BookingForm";

function BookingTab() {
  const [openModal, setOpenModal] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const bookingStore: Booking[] = useSelector((state: RootStateBooking) =>
    allBookings(state)
  );
  const userStore: UserDataTable[] = useSelector((state: RootStateUser) =>
    allUsers(state)
  );

  useEffect(() => {
    getBookings();
    getUsers();
  }, []);

  const getBookings = async () => {
    dispatch(ACTIONS_BOOKING.FETCH_START());

    try {
      const response = await axios.get(ENDPOINTS.BOOKING);
      const { data, status } = response;

      if (status === 200) {
        dispatch(ACTIONS_BOOKING.FETCH_SUCCESS(data));
      }
    } catch (error) {
      dispatch(ACTIONS_BOOKING.FETCH_FAILURE());
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

  const handleOpenCreate = () => setOpenModal(MODAL_TABS.createBooking);
  const handleOpenActionModal = useCallback(
    (id: GridRowId, modal: string) => () => {
      setOpenModal(modal);
      setSelectedBooking(bookingStore.find((booking) => booking.id === id));
    },
    [bookingStore]
  );

  const handleClose = () => {
    setOpenModal("");
    setSelectedBooking(undefined);
  };

  const handleDelete = async () => {
    if (!selectedBooking || !selectedBooking.id) return;

    try {
      dispatch(ACTIONS_BOOKING.DELETE_START());

      const response: AxiosResponse = await axios.delete(
        `${ENDPOINTS.BOOKING}/${selectedBooking.id}`,
        { withCredentials: true }
      );
      const { status } = response;

      if (status === 200) {
        const deletedBooking: DeletedBooking = {
          data: bookingStore,
          id: selectedBooking.id,
        };

        dispatch(ACTIONS_BOOKING.DELETE_SUCCESS(deletedBooking));

        handleClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError(
            "Une erreur est survenue lors de la suppression de la réservation."
          );
        }
      }

      dispatch(ACTIONS_BOOKING.DELETE_FAILURE());
      handleClose();
    }
  };

  const columns = useMemo<GridColDef<Booking>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", width: 60 },
      {
        field: "PersonId",
        headerName: "Personne",
        width: 160,
        flex: 3,
        valueGetter: (value, row) => {
          const person = userStore.find((person) => person.id === row.PersonId);
          return person
            ? `${person.firstname} ${person.lastname}`
            : "Personne non trouvée";
        },
      },
      { field: "type", headerName: "Type", minWidth: 120, flex: 2 },
      { field: "format", headerName: "Format", minWidth: 120, flex: 2 },
      {
        field: "date",
        headerName: "Date",
        type: "dateTime",
        width: 140,
        valueGetter: (value, row) => {
          return new Date(row.date);
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<CreateIcon />}
            label="Modifier"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.editBooking)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Supprimer"
            onClick={handleOpenActionModal(params.id, MODAL_TABS.delete)}
          />,
        ],
      },
    ],
    [handleOpenActionModal, userStore]
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
          Créer une réservation
        </Button>

        <WarningAlert error={error} onClick={() => setError("")} />

        <DataGrid
          rows={bookingStore}
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

      {(openModal === MODAL_TABS.createBooking ||
        openModal === MODAL_TABS.editBooking) && (
        <BookingForm
          open={openModal}
          onClose={handleClose}
          selectedBooking={selectedBooking}
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

export default BookingTab;
