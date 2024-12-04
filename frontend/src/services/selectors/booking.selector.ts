import { createSelector } from "@reduxjs/toolkit";
import { RootState as RootStateBooking } from "../../interfaces/booking";

export const allBookings = (state: RootStateBooking) => state.bookings.data;

export const filteredBookings = createSelector(
  (state: RootStateBooking) => state.bookings.data,
  (state: RootStateBooking) => state.bookings.date,
  (data, date) => {
    return data.filter(
      (booking) =>
        new Date(booking.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );
  }
);
