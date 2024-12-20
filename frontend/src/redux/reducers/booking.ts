import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Booking,
  DeletedBooking,
  UpdatedBooking,
} from "../../interfaces/booking";
import dayjs from "dayjs";

type BookingInitialeState = {
  data: Booking[];
  loading: boolean | null;
  error: boolean;
  date: string;
};

const initialState: BookingInitialeState = {
  data: [],
  loading: null,
  error: false,
  date: dayjs().toISOString(),
};

export const BookingSlice = createSlice({
  name: "Bookings",
  initialState: initialState,
  reducers: {
    FETCH_START: (draft: BookingInitialeState) => {
      draft.loading = true;
    },
    FETCH_SUCCESS: (
      draft: BookingInitialeState,
      action: PayloadAction<Booking[]>
    ) => {
      draft.loading = false;
      draft.data = action.payload;
    },
    FETCH_FAILURE: (draft: BookingInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    POST_START: (draft: BookingInitialeState) => {
      draft.loading = true;
    },
    POST_SUCCESS: (
      draft: BookingInitialeState,
      action: PayloadAction<Booking>
    ) => {
      draft.loading = false;
      draft.data.push(action.payload);
    },
    POST_FAILURE: (draft: BookingInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    UPDATE_START: (store: BookingInitialeState) => {
      store.loading = true;
    },
    UPDATE_SUCCESS: (
      store: BookingInitialeState,
      actions: PayloadAction<UpdatedBooking>
    ) => {
      const newBooking = actions.payload.update;
      const bookings = actions.payload.data;
      const newBookings: Booking[] = [];

      bookings.map((booking: Booking) => {
        if (booking.id === newBooking.id) {
          newBookings.push(newBooking);
        } else {
          newBookings.push(booking);
        }
      });

      store.loading = false;
      store.data = newBookings;
    },
    UPDATE_FAILURE: (store: BookingInitialeState) => {
      store.loading = false;
      store.error = true;
    },
    DELETE_START: (draft: BookingInitialeState) => {
      draft.loading = true;
    },
    DELETE_SUCCESS: (
      draft: BookingInitialeState,
      actions: PayloadAction<DeletedBooking>
    ) => {
      draft.loading = false;
      draft.data = actions.payload.data.filter(
        (booking: Booking) => booking.id !== actions.payload.id
      );
    },
    DELETE_FAILURE: (draft: BookingInitialeState) => {
      draft.loading = false;
      draft.error = true;
    },
    DATE_UPDATE: (
      draft: BookingInitialeState,
      actions: PayloadAction<string>
    ) => {
      draft.date = actions.payload;
    },
  },
});

export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  POST_START,
  POST_SUCCESS,
  POST_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DATE_UPDATE,
} = BookingSlice.actions;

export default BookingSlice.reducer;
