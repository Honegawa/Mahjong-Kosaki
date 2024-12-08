import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/Calendar.module.css";
import { DirectionsBus, Train, Tram } from "@mui/icons-material";
import { Map, Marker } from "pigeon-maps";
import { COORDONATE_LUDO, ITINERARY_LUDO } from "../utils/contants/calendar";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Booking,
  DeletedBooking,
  RootState as RootStateBooking,
} from "../interfaces/booking";
import * as ACTIONS_BOOKING from "../redux/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import {
  allBookings,
  filteredBookings,
} from "../services/selectors/booking.selector";
import axios, { AxiosError, AxiosResponse } from "axios";
import ENDPOINTS from "../utils/contants/endpoints";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { AuthContext } from "../utils/contexts/Auth.context";
import {
  AuthContextType,
  User,
  USER_ROLE,
  UserDataTable,
} from "../interfaces/user";
import * as ACTIONS_USER from "../redux/reducers/user";
import { MODAL_TABS } from "../utils/contants/dashboard";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import WarningAlert from "../components/WarningAlert";
import DeleteDialog from "../components/DeleteDialog";
import BookingForm from "../components/dashboardTabs/tabModals/BookingForm";

function Calendar() {
  const [openModal, setOpenModal] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext) as AuthContextType;

  const dispatch = useDispatch();
  const bookingStore: Booking[] = useSelector((state: RootStateBooking) =>
    allBookings(state)
  );
  const filteredBookingStore: Booking[] = useSelector(
    (state: RootStateBooking) => filteredBookings(state)
  );
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
    getUsers();
  }, []);

  const getBookings = async () => {
    dispatch(ACTIONS_BOOKING.FETCH_START());
    dispatch(ACTIONS_BOOKING.DATE_UPDATE(date.toISOString()));

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

  const handleClickBooking = () => {
    if (user) {
      setOpenModal(MODAL_TABS.createBooking);
    } else {
      navigate("/login");
    }
  };

  const handleOpenActionModal = useCallback(
    (id: GridRowId, modal: string) => () => {
      setOpenModal(modal);
      setSelectedBooking(
        filteredBookingStore.find((booking) => booking.id === id)
      );
    },
    [filteredBookingStore]
  );

  const handleClose = () => {
    setOpenModal("");
    setSelectedBooking(undefined);
  };

  const handleChangeDate = (value: Dayjs) => {
    setDate(value);
    dispatch(ACTIONS_BOOKING.DATE_UPDATE(value.toISOString()));
  };

  const handleClickMarker = () => {
    window.open(ITINERARY_LUDO, "_blank")?.focus();
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
        valueGetter: (_value, row) => {
          return `${row.Person.firstname} ${row.Person.lastname}`;
        },
      },
      { field: "type", headerName: "Type", minWidth: 120, flex: 2 },
      { field: "format", headerName: "Format", minWidth: 120, flex: 2 },
      {
        field: "date",
        headerName: "Date",
        type: "dateTime",
        width: 140,
        valueGetter: (_value, row) => {
          return new Date(row.date);
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        type: "actions",
        getActions: (params) =>
          date.isAfter(dayjs().set("hour", 0)) &&
          ((user && user.id === params.row.PersonId) ||
            (user && user.role === USER_ROLE.ADMIN))
            ? [
                <GridActionsCellItem
                  icon={<CreateIcon />}
                  label="Modifier"
                  onClick={handleOpenActionModal(
                    params.id,
                    MODAL_TABS.editBooking
                  )}
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Supprimer"
                  onClick={handleOpenActionModal(params.id, MODAL_TABS.delete)}
                />,
              ]
            : [],
      },
    ],
    [handleOpenActionModal, user]
  );

  return (
    <Box sx={{ width: { xs: "100%", md: 800, lg: 1000 } }}>
      <Typography variant="h4" component={"h1"} fontWeight={600}>
        Agenda
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        sx={{
          gap: 4,
          marginTop: { xs: 1, md: 3 },
        }}
      >
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 1, md: 4 },
          }}
          alignItems="center"
        >
          <DateCalendar
            value={date}
            onChange={handleChangeDate}
            sx={{ minWidth: "fit-content" }}
          />

          <Box flexGrow={1} maxWidth={688} className={styles.calendarContainer}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{
                    height: 400,
                    width: "100%",
                  }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="h2" fontWeight={600}>
                      Réservations du{" "}
                      {new Date(date.toISOString()).toLocaleDateString()}
                    </Typography>
                    <Button
                      onClick={handleClickBooking}
                      variant="contained"
                      disabled={date.isBefore(dayjs().add(1, "day"), "day")}
                    >
                      Réserver
                    </Button>
                  </Box>

                  <WarningAlert error={error} onClick={() => setError("")} />

                  <DataGrid
                    rows={filteredBookingStore}
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
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box className={styles.calendarContainer}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                gap={2}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{ width: { xs: "100%", md: "50%" } }}
                >
                  <Typography variant="h5" component="h2" fontWeight={600}>
                    Accèss
                  </Typography>

                  <Typography>
                    Adresse : 46 Av. Anatole France, 93600 Aulnay-sous-Bois
                  </Typography>

                  <Box>
                    <Typography>Transports :</Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Train />
                        </ListItemIcon>
                        <ListItemText>Train : RER B, Ligne K</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Tram />
                        </ListItemIcon>
                        <ListItemText>Tramway : T4</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DirectionsBus />
                        </ListItemIcon>
                        <ListItemText>
                          Bus : 15, 43, 251, 605, 612, 613, 615, 617, 618, 702
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                </Box>

                <Box flexGrow={1}>
                  <Map
                    height={400}
                    defaultCenter={COORDONATE_LUDO}
                    defaultZoom={16}
                  >
                    <Marker
                      width={50}
                      anchor={COORDONATE_LUDO}
                      onClick={handleClickMarker}
                    />
                  </Map>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {(openModal === MODAL_TABS.createBooking ||
        openModal === MODAL_TABS.editBooking) && (
        <BookingForm
          open={openModal}
          onClose={handleClose}
          selectedBooking={selectedBooking}
          role={user ? user.role : undefined}
          calendarDate={date}
        />
      )}

      {openModal === MODAL_TABS.delete && (
        <DeleteDialog
          open={openModal}
          onClose={handleClose}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
}

export default Calendar;
