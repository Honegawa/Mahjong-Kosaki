export interface Booking {
  id: number | null;
  date: string;
  type: string;
  format: string;
  PersonId: number | null;
}

export interface BookingFormData {
  id: number | null;
  date: string;
  type: string;
  format: string;
  PersonId?: number;
}

export type BookingDetailData = {
  id: number;
  data: Booking;
};

export type RootState = {
  bookings: {
    data: Booking[];
  };
};

export type UpdatedBooking = {
  data: Booking[];
  update: Booking;
};

export type DeletedBooking = {
  data: Booking[];
  id: number;
};
