import { RootState as RootStateBooking } from "../../interfaces/booking";

export const allBookings = (state: RootStateBooking) => state.bookings.data;
