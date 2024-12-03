export interface Booking {
  id: number | null;
  date: string;
  type: string;
  format: number;
  PersonId: number | null;
  Person: BookingPerson;
}

export interface BookingFormData {
  id: number | null;
  date: string;
  type: string;
  format: number;
  PersonId?: number;
}

export type BookingPerson = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export type BookingDetailData = {
  id: number;
  data: Booking;
};

export type RootState = {
  bookings: {
    data: Booking[];
    date: string;
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
