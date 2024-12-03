import { useEffect, useState } from "react";
import {
  Booking,
  BookingFormData,
  RootState as RootStateBooking,
  UpdatedBooking,
} from "../../../interfaces/booking";
import dayjs, { Dayjs } from "dayjs";
import cloneDeep from "lodash/cloneDeep";
import { MODAL_TABS } from "../../../utils/contants/dashboard";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import { GAME_FORMATS, GAME_TYPES } from "../../../utils/contants/game";
import axios, { AxiosError, AxiosResponse } from "axios";
import { findFormError } from "../../../utils/helpers/form.helper";
import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../../services/selectors/booking.selector";
import * as ACTIONS_BOOKING from "../../../redux/reducers/booking";
import ENDPOINTS from "../../../utils/contants/endpoints";
import {
  USER_ROLE,
  UserDataTable,
  RootState as RootStateUser,
} from "../../../interfaces/user";
import { allUsers } from "../../../services/selectors/user.selectors";

type BookingFormProps = {
  open: string;
  onClose: () => void;
  selectedBooking?: Booking;
  role?: USER_ROLE;
  calendarDate?: Dayjs;
};

function BookingForm(props: BookingFormProps) {
  const { open, selectedBooking, role, calendarDate, onClose } = props;
  const [booking, setBooking] = useState<BookingFormData>({
    id: null,
    date: calendarDate
      ? calendarDate.toISOString()
      : dayjs().add(1, "day").set("second", 0).toISOString(),
    type: "",
    format: 4,
    PersonId: undefined,
  });
  const [date, setDate] = useState<Dayjs | null>(
    selectedBooking && selectedBooking.date
      ? dayjs(selectedBooking.date)
      : calendarDate
      ? calendarDate
      : dayjs().add(1, "day").set("second", 0)
  );
  const [error, setError] = useState({
    date: "",
    server: "",
  });

  const dispatch = useDispatch();
  const bookingStore: Booking[] = useSelector((state: RootStateBooking) =>
    allBookings(state)
  );
  const userStore: UserDataTable[] = useSelector((state: RootStateUser) =>
    allUsers(state)
  );

  useEffect(() => {
    const bookingClone = cloneDeep(selectedBooking) as BookingFormData;

    if (open === MODAL_TABS.editBooking && bookingClone) {
      setBooking(bookingClone);
    }
  }, [open, selectedBooking]);

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    const { name, value } = event.target;
    setBooking((booking) => ({ ...booking, [name]: value }));
  };

  const handleChangeDate = (value: Dayjs | null) => {
    setDate(value);

    if (value && value.isValid()) {
      setBooking((booking) => ({
        ...booking,
        date: value.set("second", 0).toISOString(),
      }));
    } else if (!value) {
      setBooking((booking) => ({
        ...booking,
        date: "",
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (findFormError(error)) return;

    try {
      let response: AxiosResponse;

      if (selectedBooking && selectedBooking.id) {
        // Update
        dispatch(ACTIONS_BOOKING.UPDATE_START());

        response = await axios.put(
          `${ENDPOINTS.BOOKING}/${selectedBooking.id}`,
          booking,
          {
            withCredentials: true,
          }
        );
      } else {
        // Create
        dispatch(ACTIONS_BOOKING.POST_START());

        response = await axios.post(ENDPOINTS.BOOKING, booking, {
          withCredentials: true,
        });
      }

      const { data, status } = response;

      if (status === 200) {
        const newBooking: Booking = data.updatedBooking;

        const updatedBooking: UpdatedBooking = {
          data: bookingStore,
          update: newBooking,
        };

        dispatch(ACTIONS_BOOKING.UPDATE_SUCCESS(updatedBooking));
        onClose();
      } else if (status === 201) {
        const newBooking: Booking = data.newBooking;

        dispatch(ACTIONS_BOOKING.POST_SUCCESS(newBooking));
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
          setError((error) => ({
            ...error,
            server: `Une erreur est survenue lors de la ${
              booking ? "modification" : "création"
            } de la réservation.`,
          }));
        }
      }

      dispatch(ACTIONS_BOOKING.POST_FAILURE());
    }
  };

  const handleErrorDate = (
    newError: DateTimeValidationError,
    field: string
  ) => {
    switch (newError) {
      case "minDate":
        setError((error) => ({
          ...error,
          [field]: "La date ne peut pas être antérieure à demain.",
        }));
        break;
      case "minTime":
        setError((error) => ({
          ...error,
          [field]: "La date ne peut pas être antérieure à demain.",
        }));
        break;
      case "invalidDate":
        setError((error) => ({ ...error, [field]: "Date invalide." }));
        break;

      default:
        setError((error) => ({ ...error, [field]: "" }));
        break;
    }
  };

  return (
    <Dialog
      open={
        open === MODAL_TABS.createBooking || open === MODAL_TABS.editBooking
      }
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: { width: "440px" },
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {!selectedBooking ? "Création" : "Modification"} de la réservation
      </DialogTitle>
      <DialogContent>
        {role === USER_ROLE.ADMIN && !selectedBooking && (
          <FormControl required margin="dense" fullWidth>
            <InputLabel id="PersonIdLabel">Personne</InputLabel>
            <Select
              labelId="PersonIdLabel"
              id="PersonId"
              name="PersonId"
              label="Personne"
              onChange={handleSelectChange}
              value={booking.PersonId ?? ""}
              variant="outlined"
            >
              {userStore.map((user) =>
                user.id ? (
                  <MenuItem key={`user-${user.id}`} value={user.id}>
                    {`${user.firstname} ${user.lastname}`}
                  </MenuItem>
                ) : (
                  <></>
                )
              )}
            </Select>
          </FormControl>
        )}

        <DateTimePicker
          name="date"
          label="Date"
          value={date}
          onChange={handleChangeDate}
          onError={(newError) => handleErrorDate(newError, "date")}
          minDateTime={dayjs().set("hour", 23).set("minute", 59)}
          sx={{ width: "100%", marginY: 1 }}
          slotProps={{
            textField: {
              helperText: error.date,
              required: true,
            },
          }}
        />

        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <FormControl required margin="dense" fullWidth>
            <InputLabel id="typeLabel">Type</InputLabel>
            <Select
              labelId="typeLabel"
              id="type"
              name="type"
              label="Type"
              onChange={handleSelectChange}
              value={booking.type}
              variant="outlined"
            >
              {GAME_TYPES.map((type) => (
                <MenuItem key={`${type}-type`} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required margin="dense" fullWidth>
            <InputLabel id="formatLabel">Format</InputLabel>
            <Select
              labelId="formatLabel"
              id="format"
              name="format"
              label="Format"
              onChange={handleSelectChange}
              value={booking.format}
              variant="outlined"
            >
              {GAME_FORMATS.map((format) => (
                <MenuItem key={`${format}-format`} value={format}>
                  {format}P
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button type="submit" variant="contained">
          {!selectedBooking ? "Créer" : "Modifier"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingForm;
